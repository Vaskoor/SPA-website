<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('practitioners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('employee_code')->unique();
            $table->text('bio');
            $table->text('full_bio')->nullable();
            $table->integer('years_experience')->default(0);
            $table->json('specialties');
            $table->json('certifications');
            $table->json('languages_spoken');
            $table->enum('gender', ['male', 'female']);
            $table->string('photo')->nullable();
            $table->decimal('rating', 2, 1)->default(5.0);
            $table->integer('total_reviews')->default(0);
            $table->boolean('is_available')->default(true);
            $table->boolean('is_active')->default(true);
            $table->decimal('commission_rate', 5, 2)->default(30.00);
            $table->json('working_hours')->nullable();
            $table->date('join_date');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('practitioners');
    }
};
