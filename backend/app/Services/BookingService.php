<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Practitioner;
use App\Models\Service;
use App\Models\PromoCode;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class BookingService
{
    public function createBooking(array $data)
    {
        return DB::transaction(function () use ($data) {
            $service = Service::findOrFail($data['service_id']);
            $duration = $data['duration_minutes'];
            
            $booking = new Booking();
            $booking->client_id = $data['client_id'];
            $booking->service_id = $data['service_id'];
            $booking->duration_minutes = $duration;
            $booking->booking_date = $data['booking_date'];
            $booking->start_time = $data['start_time'];
            $booking->end_time = Carbon::parse($data['start_time'])->addMinutes($duration)->format('H:i:s');
            $booking->gender_preference = $data['gender_preference'] ?? 'no_preference';
            $booking->pressure_preference = $data['pressure_preference'] ?? null;
            $booking->add_ons = $data['add_ons'] ?? [];
            $booking->special_requests = $data['special_requests'] ?? null;
            $booking->medical_notes = $data['medical_notes'] ?? null;
            $booking->medical_disclaimer_accepted = $data['medical_disclaimer_accepted'] ?? false;
            $booking->booking_source = $data['booking_source'] ?? 'website';
            $booking->hotel_id = $data['hotel_id'] ?? null;
            $booking->room_number = $data['room_number'] ?? null;
            $booking->currency = $data['currency'] ?? 'USD';
            $booking->exchange_rate = $this->getExchangeRate($booking->currency);
            
            // Match practitioner
            $practitioner = $this->matchPractitioner($data);
            if (!$practitioner) {
                throw new \Exception('No available practitioner found for the selected time.');
            }
            $booking->practitioner_id = $practitioner->id;
            
            // Calculate pricing
            $pricing = $this->calculatePricing($service, $duration, $booking->currency, $data['promo_code'] ?? null);
            $booking->subtotal = $pricing['subtotal'];
            $booking->discount_amount = $pricing['discount'];
            $booking->promo_code = $data['promo_code'] ?? null;
            $booking->tax_amount = $pricing['tax'];
            $booking->total_amount = $pricing['total'];
            $booking->payment_status = $data['payment_status'] ?? 'pending';
            $booking->amount_paid = $data['amount_paid'] ?? 0;
            
            $booking->save();
            
            return $booking;
        });
    }

    public function matchPractitioner(array $data)
    {
        $service = Service::findOrFail($data['service_id']);
        $date = Carbon::parse($data['booking_date']);
        $startTime = $data['start_time'];
        $endTime = Carbon::parse($startTime)->addMinutes($data['duration_minutes'])->format('H:i:s');
        $genderPreference = $data['gender_preference'] ?? 'no_preference';
        $preferredPractitionerId = $data['practitioner_id'] ?? null;
        
        // Get eligible practitioners for this service
        $query = $service->eligiblePractitioners();
        
        // Apply gender preference filter
        if ($genderPreference !== 'no_preference') {
            $query->where('gender', $genderPreference);
        }
        
        // If client chose a specific practitioner
        if ($preferredPractitionerId) {
            $preferred = $query->find($preferredPractitionerId);
            if ($preferred && $preferred->isAvailableOn($date, $startTime, $endTime)) {
                return $preferred;
            }
            // If preferred is not available, continue to find alternatives
        }
        
        // Find available practitioners
        $practitioners = $query->get();
        
        foreach ($practitioners as $practitioner) {
            if ($practitioner->isAvailableOn($date, $startTime, $endTime)) {
                return $practitioner;
            }
        }
        
        return null;
    }

    public function calculatePricing(Service $service, int $duration, string $currency, ?string $promoCode = null)
    {
        $basePrice = $service->getPriceForDuration($duration, $currency) ?? 0;
        $subtotal = $basePrice;
        
        // Calculate add-ons
        // ...
        
        $discount = 0;
        if ($promoCode) {
            $promo = PromoCode::where('code', $promoCode)
                ->where('is_active', true)
                ->where('valid_from', '<=', now())
                ->where('valid_until', '>=', now())
                ->first();
            
            if ($promo && ($promo->usage_limit === null || $promo->usage_count < $promo->usage_limit)) {
                if ($promo->type === 'percentage') {
                    $discount = min($subtotal * ($promo->value / 100), $promo->max_discount_amount ?? $subtotal);
                } else {
                    $discount = min($promo->value, $subtotal);
                }
            }
        }
        
        $taxRate = 0.13; // 13% VAT for Nepal
        $taxableAmount = $subtotal - $discount;
        $tax = $taxableAmount * $taxRate;
        $total = $taxableAmount + $tax;
        
        return [
            'subtotal' => round($subtotal, 2),
            'discount' => round($discount, 2),
            'tax' => round($tax, 2),
            'total' => round($total, 2),
        ];
    }

    public function getAvailableSlots($serviceId, $date, $duration = 60)
    {
        $service = Service::findOrFail($serviceId);
        $practitioners = $service->eligiblePractitioners()->get();
        
        $businessHours = $this->getBusinessHours($date);
        if (!$businessHours['is_open']) {
            return [];
        }
        
        $slots = [];
        $interval = 30; // 30-minute intervals
        
        $start = Carbon::parse($date . ' ' . $businessHours['open_time']);
        $end = Carbon::parse($date . ' ' . $businessHours['close_time'])->subMinutes($duration);
        
        while ($start <= $end) {
            $slotTime = $start->format('H:i');
            $slotEnd = $start->copy()->addMinutes($duration)->format('H:i:s');
            
            $availablePractitioners = 0;
            foreach ($practitioners as $practitioner) {
                if ($practitioner->isAvailableOn(Carbon::parse($date), $slotTime . ':00', $slotEnd)) {
                    $availablePractitioners++;
                }
            }
            
            if ($availablePractitioners > 0) {
                $slots[] = [
                    'time' => $slotTime,
                    'available_practitioners' => $availablePractitioners,
                ];
            }
            
            $start->addMinutes($interval);
        }
        
        return $slots;
    }

    public function getBusinessHours($date)
    {
        $dayOfWeek = strtolower(Carbon::parse($date)->format('l'));
        $hours = \App\Models\BusinessHours::where('day', $dayOfWeek)->first();
        
        if (!$hours) {
            return ['is_open' => false];
        }
        
        return [
            'is_open' => $hours->is_open,
            'open_time' => $hours->open_time,
            'close_time' => $hours->close_time,
        ];
    }

    public function getExchangeRate($currency)
    {
        $rates = [
            'USD' => 1,
            'EUR' => 0.92,
            'GBP' => 0.79,
            'NPR' => 133.50,
            'INR' => 83.12,
            'AUD' => 1.52,
            'CAD' => 1.36,
            'JPY' => 149.50,
        ];
        
        return $rates[$currency] ?? 1;
    }

    public function rescheduleBooking(Booking $booking, array $data)
    {
        if (!$booking->canBeCancelled()) {
            throw new \Exception('Booking cannot be rescheduled.');
        }
        
        $newPractitioner = $this->matchPractitioner([
            'service_id' => $booking->service_id,
            'duration_minutes' => $booking->duration_minutes,
            'booking_date' => $data['new_date'],
            'start_time' => $data['new_time'],
            'gender_preference' => $booking->gender_preference,
        ]);
        
        if (!$newPractitioner) {
            throw new \Exception('No available practitioner for the new time slot.');
        }
        
        $booking->booking_date = $data['new_date'];
        $booking->start_time = $data['new_time'];
        $booking->end_time = Carbon::parse($data['new_time'])->addMinutes($booking->duration_minutes)->format('H:i:s');
        $booking->practitioner_id = $newPractitioner->id;
        $booking->save();
        
        return $booking;
    }
}
