<?php

use App\Http\Controllers\DestinationController;
use App\Http\Controllers\OnboardingController;
use App\Mail\ReEngageFounder;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('onboarding/{step}', [OnboardingController::class, 'show'])->whereNumber('step')->name('onboarding.show');
    Route::post('onboarding/{step}', [OnboardingController::class, 'store'])->whereNumber('step')->name('onboarding.store');
});

// Destination stubs mirror the real ScaleupMap paths. Each is one tutorial step with the reason the founder landed there.
Route::middleware(['auth', 'verified', 'onboarded'])->group(function () {
    Route::get('dashboard', [DestinationController::class, 'dashboard'])->name('dashboard');
    Route::post('tutorial/{route}/done', [DestinationController::class, 'done'])->name('tutorial.done');

    foreach (require app_path('Onboarding/destinations.php') as $name => $destination) {
        if ($name !== 'dashboard') {
            Route::get(ltrim($destination['path'], '/'), [DestinationController::class, 'show'])->defaults('route', $name)->name($name);
        }
    }
});

// Demo only: see the re-engagement email in the browser for the seeded stalled founder.
Route::middleware('auth')->get('mail/re-engage/{user}', function (User $user) {
    abort_unless($user->is(request()->user()) && $user->onboarded_at !== null, 403);

    return (new ReEngageFounder($user))->render();
})->name('mail.re-engage');

require __DIR__.'/settings.php';
