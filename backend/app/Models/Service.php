<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'full_description',
        'category',
        'icon',
        'image',
        'gallery',
        'durations',
        'pricing',
        'benefits',
        'contraindications',
        'before_care',
        'after_care',
        'is_active',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'durations' => 'array',
        'pricing' => 'array',
        'benefits' => 'array',
        'contraindications' => 'array',
        'before_care' => 'array',
        'after_care' => 'array',
        'gallery' => 'array',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function practitioners()
    {
        return $this->belongsToMany(Practitioner::class, 'service_practitioner')
            ->withPivot('is_primary');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function eligiblePractitioners()
    {
        return $this->practitioners()
            ->where('is_active', true)
            ->where('is_available', true);
    }

    public function getPriceForDuration($duration, $currency = 'USD')
    {
        $pricing = $this->pricing[$duration] ?? null;
        if (!$pricing) return null;
        
        return $pricing[$currency] ?? $pricing['USD'];
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true)->where('is_active', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
