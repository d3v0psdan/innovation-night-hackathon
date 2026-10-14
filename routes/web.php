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

// Destination stubs mirror the real ScaleupMap paths. Each says why the founder landed there and links to the real tool.
$destination = fn (string $title, string $icon, string $blurb, string $path) => fn (OnboardingRouter $router) => Inertia::render('destination', [
    'title' => $title,
    'icon' => $icon,
    'blurb' => $blurb,
    'href' => 'https://scaleupmap.com'.$path,
    'because' => $router->reasonFor(request()->user()),
]);

Route::middleware(['auth', 'verified', 'onboarded'])->group(function () use ($destination) {
    // Onboarded founders who open the dashboard go to their first tool. No answers means the dashboard itself.
    Route::get('dashboard', function (OnboardingRouter $router) use ($destination) {
        $route = $router->destinationFor(request()->user());

        return $route === 'dashboard'
            ? $destination('Dashboard', 'Compass', 'Every tool in one place. Pick one to start.', '/dashboard')($router)
            : redirect()->route($route);
    })->name('dashboard');
    Route::get('dashboard/score', $destination('ScaleupMap Score', 'ChartBar', 'See your venture the way investors do and fix the blind spots first. About 10 minutes.', '/dashboard/score'))->name('destination.score');
    Route::get('dashboard/memo', $destination('Investment memo', 'FileText', 'Turn your venture into the one page investors ask for. About 20 minutes.', '/dashboard/memo'))->name('destination.memo');
    Route::get('entities', $destination('Investor directory', 'UsersThree', 'Browse investors and grants that match your stage and apply in one click.', '/entities#static-investors'))->name('destination.investors');
    Route::get('coach', $destination('Journey map', 'MapTrifold', 'Map where you are and the next three moves before you build more.', '/coach?view=map'))->name('destination.map');
    Route::get('coach/north-star-sprint', $destination('North Star Sprint', 'Lightning', 'One metric, one week, a daily plan to move it.', '/coach/north-star-sprint'))->name('destination.sprint');
});

require __DIR__.'/settings.php';
