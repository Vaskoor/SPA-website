<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'nationality',
        'preferred_language',
        'preferred_currency',
        'gender',
        'date_of_birth',
        'medical_notes',
        'is_vip',
        'loyalty_points',
        'profile_photo',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'date_of_birth' => 'date',
        'is_vip' => 'boolean',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'client_id');
    }

    public function practitioner()
    {
        return $this->hasOne(Practitioner::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function isAdmin()
    {
        return in_array($this->role, ['admin', 'super_admin']);
    }

    public function isPractitioner()
    {
        return $this->role === 'practitioner';
    }

    public function isClient()
    {
        return $this->role === 'client';
    }
}
