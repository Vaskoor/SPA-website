<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Services\BookingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    protected $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|exists:services,id',
            'duration_minutes' => 'required|integer|min:30',
            'booking_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'gender_preference' => 'nullable|in:male,female,no_preference',
            'pressure_preference' => 'nullable|in:light,medium,firm,deep',
            'practitioner_id' => 'nullable|exists:practitioners,id',
            'add_ons' => 'nullable|array',
            'special_requests' => 'nullable|string',
            'medical_notes' => 'nullable|string',
            'medical_disclaimer_accepted' => 'required|boolean',
            'promo_code' => 'nullable|string',
            'currency' => 'nullable|string|size:3',
            'hotel_id' => 'nullable|exists:users,id',
            'room_number' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $data = $request->all();
            $data['client_id'] = $request->user()->id;
            $data['booking_source'] = 'website';
            
            $booking = $this->bookingService->createBooking($data);
            
            return response()->json([
                'success' => true,
                'message' => 'Booking created successfully',
                'data' => $booking->load(['service', 'practitioner.user', 'client'])
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function cancel(Request $request, $id)
    {
        $booking = Booking::where('client_id', $request->user()->id)->findOrFail($id);
        
        if (!$booking->canBeCancelled()) {
            return response()->json([
                'success' => false,
                'message' => 'Booking cannot be cancelled. Must be cancelled at least 24 hours in advance.'
            ], 400);
        }

        $booking->status = 'cancelled';
        $booking->cancelled_at = now();
        $booking->cancellation_reason = $request->input('reason');
        $booking->save();

        return response()->json([
            'success' => true,
            'message' => 'Booking cancelled successfully'
        ]);
    }

    public function reschedule(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'new_date' => 'required|date|after_or_equal:today',
            'new_time' => 'required|date_format:H:i',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $booking = Booking::where('client_id', $request->user()->id)->findOrFail($id);

        try {
            $booking = $this->bookingService->rescheduleBooking($booking, $request->all());
            
            return response()->json([
                'success' => true,
                'message' => 'Booking rescheduled successfully',
                'data' => $booking
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    // Admin Methods
    public function adminIndex(Request $request)
    {
        $query = Booking::with(['client', 'practitioner.user', 'service']);
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->has('date')) {
            $query->whereDate('booking_date', $request->date);
        }
        
        if ($request->has('practitioner_id')) {
            $query->where('practitioner_id', $request->practitioner_id);
        }
        
        $bookings = $query->orderBy('booking_date', 'desc')
            ->orderBy('start_time', 'desc')
            ->paginate(20);
        
        return response()->json($bookings);
    }

    public function adminShow($id)
    {
        $booking = Booking::with([
            'client', 
            'practitioner.user', 
            'service', 
            'hotel',
            'review',
            'payments',
            'communications'
        ])->findOrFail($id);
        
        return response()->json($booking);
    }

    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,confirmed,in_progress,completed,cancelled,no_show',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $booking = Booking::findOrFail($id);
        $booking->status = $request->status;
        
        if ($request->status === 'confirmed') {
            $booking->confirmed_at = now();
        } elseif ($request->status === 'completed') {
            $booking->completed_at = now();
        } elseif ($request->status === 'cancelled') {
            $booking->cancelled_at = now();
        }
        
        $booking->save();

        return response()->json([
            'success' => true,
            'message' => 'Booking status updated',
            'data' => $booking
        ]);
    }

    public function manualBooking(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'client_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
            'duration_minutes' => 'required|integer',
            'booking_date' => 'required|date',
            'start_time' => 'required',
            'practitioner_id' => 'nullable|exists:practitioners,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $data = $request->all();
            $data['booking_source'] = $request->input('source', 'admin');
            $data['created_by'] = $request->user()->id;
            
            $booking = $this->bookingService->createBooking($data);
            
            return response()->json([
                'success' => true,
                'message' => 'Manual booking created',
                'data' => $booking
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function calendarView(Request $request)
    {
        $startDate = $request->input('start_date', now()->startOfWeek()->format('Y-m-d'));
        $endDate = $request->input('end_date', now()->endOfWeek()->format('Y-m-d'));
        
        $bookings = Booking::with(['client', 'practitioner.user', 'service'])
            ->whereBetween('booking_date', [$startDate, $endDate])
            ->whereIn('status', ['confirmed', 'in_progress', 'pending'])
            ->orderBy('start_time')
            ->get()
            ->groupBy('booking_date');
        
        return response()->json($bookings);
    }
}
