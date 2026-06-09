<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('full_description')->nullable();
            $table->enum('category', ['massage', 'ayurveda', 'beauty', 'wellness', 'package']);
            $table->string('icon')->nullable();
            $table->string('image')->nullable();
            $table->json('gallery')->nullable();
            $table->json('durations');
            $table->json('pricing');
            $table->json('benefits');
            $table->json('contraindications')->nullable();
            $table->json('before_care')->nullable();
            $table->json('after_care')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('service_practitioner', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->foreignId('practitioner_id')->constrained()->onDelete('cascade');
            $table->boolean('is_primary')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_practitioner');
        Schema::dropIfExists('services');
    }
};
