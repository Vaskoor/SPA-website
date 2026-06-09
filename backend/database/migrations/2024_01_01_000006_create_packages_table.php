<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->enum('type', ['couple', 'multi_day', 'seasonal', 'hotel_guest', 'gift_card']);
            $table->json('services');
            $table->integer('duration_days')->default(1);
            $table->decimal('original_price', 10, 2);
            $table->decimal('discounted_price', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->json('inclusions');
            $table->json('validity')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->date('valid_from')->nullable();
            $table->date('valid_until')->nullable();
            $table->integer('max_bookings')->nullable();
            $table->integer('bookings_count')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('gift_cards', function (Blueprint $table) {
            $table->id();
            $table->string('card_number')->unique();
            $table->foreignId('package_id')->constrained()->onDelete('cascade');
            $table->foreignId('purchased_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('redeemed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->enum('status', ['active', 'redeemed', 'expired', 'cancelled'])->default('active');
            $table->date('purchase_date');
            $table->date('expiry_date');
            $table->date('redeemed_date')->nullable();
            $table->text('recipient_name')->nullable();
            $table->text('recipient_email')->nullable();
            $table->text('message')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gift_cards');
        Schema::dropIfExists('packages');
    }
};
