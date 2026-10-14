<?php

use App\Http\Controllers\OnboardingController;
use App\Onboarding\OnboardingRouter;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('onboarding/{step}', [OnboardingController::class, 'show'])->whereNumber('step')->name('onboarding.show');
    Route::post('onboarding/{step}', [OnboardingController::class, 'store'])->whereNumber('step')->name('onboarding.store');
});

// Destination stubs mirror the real ScaleupMap paths. Each says why the founder landed there.
$destination = fn (string $title) => fn (OnboardingRouter $router) => Inertia::render('destination', [
    'title' => $title,
    'because' => $router->reasonFor(request()->user()),
]);

Route::middleware(['auth', 'verified', 'onboarded'])->group(function () use ($destination) {
    Route::get('dashboard', $destination('Dashboard'))->name('dashboard');
    Route::get('dashboard/score', $destination('ScaleupMap Score'))->name('destination.score');
    Route::get('dashboard/memo', $destination('Investment memo'))->name('destination.memo');
    Route::get('entities', $destination('Investor directory'))->name('destination.investors');
    Route::get('coach', $destination('Journey map'))->name('destination.map');
    Route::get('coach/north-star-sprint', $destination('North Star Sprint'))->name('destination.sprint');
});

require __DIR__.'/settings.php';
