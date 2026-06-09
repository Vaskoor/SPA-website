<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    AuthController,
    BookingController,
    ServiceController,
    PractitionerController,
    ReviewController,
    PackageController,
    PaymentController,
    ClientController,
    DashboardController,
    SettingController,
    CommunicationController,
    GalleryController,
    FaqController,
    TestimonialController
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Public Data Routes
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);
Route::get('/services/{id}/practitioners', [ServiceController::class, 'getPractitioners']);
Route::get('/services/{id}/available-slots', [ServiceController::class, 'getAvailableSlots']);

Route::get('/practitioners', [PractitionerController::class, 'index']);
Route::get('/practitioners/{id}', [PractitionerController::class, 'show']);
Route::get('/practitioners/{id}/reviews', [PractitionerController::class, 'getReviews']);
Route::get('/practitioners/{id}/availability', [PractitionerController::class, 'getAvailability']);

Route::get('/packages', [PackageController::class, 'index']);
Route::get('/packages/{slug}', [PackageController::class, 'show']);

Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/faqs', [FaqController::class, 'index']);
Route::get('/gallery', [GalleryController::class, 'index']);

Route::get('/settings', [SettingController::class, 'publicSettings']);
Route::get('/exchange-rates', [SettingController::class, 'getExchangeRates']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    
    // Client Routes
    Route::get('/my-bookings', [ClientController::class, 'myBookings']);
    Route::get('/my-bookings/{id}', [ClientController::class, 'showBooking']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::put('/bookings/{id}/cancel', [BookingController::class, 'cancel']);
    Route::put('/bookings/{id}/reschedule', [BookingController::class, 'reschedule']);
    
    // Reviews
    Route::post('/bookings/{id}/review', [ReviewController::class, 'store']);
    
    // Payments
    Route::post('/payments/intent', [PaymentController::class, 'createIntent']);
    Route::post('/payments/confirm', [PaymentController::class, 'confirmPayment']);
    
    // Notifications
    Route::get('/notifications', [ClientController::class, 'notifications']);
    Route::put('/notifications/{id}/read', [ClientController::class, 'markNotificationRead']);
    
    // Gift Cards
    Route::post('/gift-cards', [PackageController::class, 'purchaseGiftCard']);
    Route::get('/my-gift-cards', [ClientController::class, 'myGiftCards']);
    
    // Admin Routes
    Route::middleware('role:admin|super_admin')->prefix('admin')->group(function () {
        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
        Route::get('/dashboard/revenue', [DashboardController::class, 'revenueChart']);
        
        // Bookings Management
        Route::get('/bookings', [BookingController::class, 'adminIndex']);
        Route::get('/bookings/{id}', [BookingController::class, 'adminShow']);
        Route::put('/bookings/{id}/status', [BookingController::class, 'updateStatus']);
        Route::post('/bookings/manual', [BookingController::class, 'manualBooking']);
        Route::get('/bookings-calendar', [BookingController::class, 'calendarView']);
        
        // Practitioners Management
        Route::get('/practitioners', [PractitionerController::class, 'adminIndex']);
        Route::post('/practitioners', [PractitionerController::class, 'store']);
        Route::put('/practitioners/{id}', [PractitionerController::class, 'update']);
        Route::delete('/practitioners/{id}', [PractitionerController::class, 'destroy']);
        Route::put('/practitioners/{id}/availability', [PractitionerController::class, 'updateAvailability']);
        Route::get('/practitioners/{id}/schedule', [PractitionerController::class, 'getSchedule']);
        
        // Services Management
        Route::get('/services', [ServiceController::class, 'adminIndex']);
        Route::post('/services', [ServiceController::class, 'store']);
        Route::put('/services/{id}', [ServiceController::class, 'update']);
        Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
        
        // Clients Management
        Route::get('/clients', [ClientController::class, 'adminIndex']);
        Route::get('/clients/{id}', [ClientController::class, 'adminShow']);
        Route::put('/clients/{id}', [ClientController::class, 'adminUpdate']);
        Route::get('/clients/{id}/history', [ClientController::class, 'clientHistory']);
        
        // Reviews Management
        Route::get('/reviews', [ReviewController::class, 'adminIndex']);
        Route::put('/reviews/{id}/approve', [ReviewController::class, 'approve']);
        Route::put('/reviews/{id}/feature', [ReviewController::class, 'feature']);
        Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
        
        // Packages Management
        Route::post('/packages', [PackageController::class, 'store']);
        Route::put('/packages/{id}', [PackageController::class, 'update']);
        Route::delete('/packages/{id}', [PackageController::class, 'destroy']);
        
        // Promo Codes
        Route::get('/promo-codes', [SettingController::class, 'promoCodes']);
        Route::post('/promo-codes', [SettingController::class, 'createPromoCode']);
        Route::put('/promo-codes/{id}', [SettingController::class, 'updatePromoCode']);
        Route::delete('/promo-codes/{id}', [SettingController::class, 'deletePromoCode']);
        
        // Communications
        Route::get('/communications', [CommunicationController::class, 'index']);
        Route::post('/communications/send', [CommunicationController::class, 'send']);
        Route::get('/email-templates', [CommunicationController::class, 'emailTemplates']);
        Route::put('/email-templates/{id}', [CommunicationController::class, 'updateTemplate']);
        
        // Reports
        Route::get('/reports/revenue', [DashboardController::class, 'revenueReport']);
        Route::get('/reports/practitioners', [DashboardController::class, 'practitionerReport']);
        Route::get('/reports/services', [DashboardController::class, 'serviceReport']);
        Route::get('/reports/clients', [DashboardController::class, 'clientReport']);
        
        // Settings
        Route::get('/settings', [SettingController::class, 'index']);
        Route::put('/settings', [SettingController::class, 'update']);
        Route::put('/business-hours', [SettingController::class, 'updateBusinessHours']);
        
        // Gallery
        Route::post('/gallery', [GalleryController::class, 'store']);
        Route::put('/gallery/{id}', [GalleryController::class, 'update']);
        Route::delete('/gallery/{id}', [GalleryController::class, 'destroy']);
        
        // FAQs
        Route::post('/faqs', [FaqController::class, 'store']);
        Route::put('/faqs/{id}', [FaqController::class, 'update']);
        Route::delete('/faqs/{id}', [FaqController::class, 'destroy']);
        
        // Testimonials
        Route::post('/testimonials', [TestimonialController::class, 'store']);
        Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
        Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);
    });
});
