<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'booking_id',
        'client_id',
        'practitioner_id',
        'service_id',
        'rating',
        'review_text',
        'tags',
        'is_verified',
        'is_approved',
        'is_featured',
        'status',
        'admin_notes',
        'approved_by',
        'approved_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_verified' => 'boolean',
        'is_approved' => 'boolean',
        'is_featured' => 'boolean',
        'approved_at' => 'datetime',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
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

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    protected static function boot()
    {
        parent::boot();
        
        static::created(function ($review) {
            $review->practitioner->updateRating();
        });
        
        static::updated(function ($review) {
            $review->practitioner->updateRating();
        });
    }
}
