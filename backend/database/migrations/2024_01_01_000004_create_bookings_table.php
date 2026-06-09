<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_number')->unique();
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('practitioner_id')->constrained()->onDelete('cascade');
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->integer('duration_minutes');
            $table->date('booking_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->enum('status', ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'])->default('pending');
            $table->enum('gender_preference', ['male', 'female', 'no_preference'])->default('no_preference');
            $table->enum('pressure_preference', ['light', 'medium', 'firm', 'deep'])->nullable();
            $table->json('add_ons')->nullable();
            $table->text('special_requests')->nullable();
            $table->text('medical_notes')->nullable();
            $table->boolean('medical_disclaimer_accepted')->default(false);
            $table->enum('booking_source', ['website', 'whatsapp', 'phone', 'walk_in', 'hotel', 'admin'])->default('website');
            $table->foreignId('hotel_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('room_number')->nullable();
            $table->decimal('subtotal', 10, 2);
            $table->decimal('discount_amount', 10, 2)->default(0);
            $table->string('promo_code')->nullable();
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->decimal('exchange_rate', 10, 6)->default(1);
            $table->enum('payment_status', ['pending', 'partial', 'paid', 'refunded', 'failed'])->default('pending');
            $table->decimal('amount_paid', 10, 2)->default(0);
            $table->string('payment_method')->nullable();
            $table->string('transaction_id')->nullable();
            $table->text('internal_notes')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
