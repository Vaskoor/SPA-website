<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'booking_number',
        'client_id',
        'practitioner_id',
        'service_id',
        'duration_minutes',
        'booking_date',
        'start_time',
        'end_time',
        'status',
        'gender_preference',
        'pressure_preference',
        'add_ons',
        'special_requests',
        'medical_notes',
        'medical_disclaimer_accepted',
        'booking_source',
        'hotel_id',
        'room_number',
        'subtotal',
        'discount_amount',
        'promo_code',
        'tax_amount',
        'total_amount',
        'currency',
        'exchange_rate',
        'payment_status',
        'amount_paid',
        'payment_method',
        'transaction_id',
        'internal_notes',
        'confirmed_at',
        'completed_at',
        'cancelled_at',
        'cancellation_reason',
        'created_by',
    ];

    protected $casts = [
        'booking_date' => 'date',
        'add_ons' => 'array',
        'medical_disclaimer_accepted' => 'boolean',
        'confirmed_at' => 'datetime',
        'completed_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($booking) {
            if (empty($booking->booking_number)) {
                $booking->booking_number = 'SPA' . date('Ymd') . strtoupper(substr(uniqid(), -6));
            }
        });
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function practitioner()
    {
        return $this->belongsTo(Practitioner::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function hotel()
    {
        return $this->belongsTo(User::class, 'hotel_id');
    }

    public function review()
    {
        return $this->hasOne(Review::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }

    public function communications()
    {
        return $this->hasMany(Communication::class);
    }

    public function scopeToday($query)
    {
        return $query->whereDate('booking_date', today());
    }

    public function scopeUpcoming($query)
    {
        return $query->where('booking_date', '>=', today())
            ->whereIn('status', ['pending', 'confirmed']);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function isConfirmed()
    {
        return in_array($this->status, ['confirmed', 'in_progress', 'completed']);
    }

    public function canBeCancelled()
    {
        return in_array($this->status, ['pending', 'confirmed']) 
            && $this->booking_date > now()->addHours(24);
    }

    public function calculateEndTime()
    {
        $start = \Carbon\Carbon::parse($this->start_time);
        $this->end_time = $start->addMinutes($this->duration_minutes)->format('H:i:s');
        return $this->end_time;
    }
}
