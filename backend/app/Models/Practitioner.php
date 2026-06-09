<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Practitioner extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'employee_code',
        'bio',
        'full_bio',
        'years_experience',
        'specialties',
        'certifications',
        'languages_spoken',
        'gender',
        'photo',
        'rating',
        'total_reviews',
        'is_available',
        'is_active',
        'commission_rate',
        'working_hours',
        'join_date',
    ];

    protected $casts = [
        'specialties' => 'array',
        'certifications' => 'array',
        'languages_spoken' => 'array',
        'working_hours' => 'array',
        'is_available' => 'boolean',
        'is_active' => 'boolean',
        'join_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'service_practitioner');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function isAvailableOn($date, $startTime, $endTime)
    {
        $dayOfWeek = strtolower($date->format('l'));
        $workingHours = $this->working_hours[$dayOfWeek] ?? null;
        
        if (!$workingHours || !($workingHours['is_working'] ?? false)) {
            return false;
        }

        $existingBookings = $this->bookings()
            ->where('booking_date', $date->format('Y-m-d'))
            ->whereIn('status', ['confirmed', 'in_progress'])
            ->where(function ($query) use ($startTime, $endTime) {
                $query->whereBetween('start_time', [$startTime, $endTime])
                    ->orWhereBetween('end_time', [$startTime, $endTime])
                    ->orWhere(function ($q) use ($startTime, $endTime) {
                        $q->where('start_time', '<=', $startTime)
                            ->where('end_time', '>=', $endTime);
                    });
            })
            ->exists();

        return !$existingBookings;
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeAvailable($query)
    {
        return $query->where('is_available', true)->where('is_active', true);
    }
}
