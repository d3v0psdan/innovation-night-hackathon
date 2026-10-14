<?php

namespace App\Http\Controllers;

use App\Onboarding\OnboardingRouter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DestinationController extends Controller
{
    /** The dashboard sends an onboarded founder to their landing tool. No signal means the dashboard itself. */
    public function dashboard(Request $request, OnboardingRouter $router): Response|RedirectResponse
    {
        $route = $router->destinationFor($request->user());

        return $route === 'dashboard' ? $this->show($request, $router, 'dashboard') : redirect()->route($route);
    }

    /** One tutorial step: why you are here, what the tool does, the first action, and what comes next. */
    public function show(Request $request, OnboardingRouter $router, string $route): Response
    {
        $destinations = $this->destinations();
        $user = $request->user();
        $recommended = $router->recommendationsFor($user);

        $nextUp = array_values(array_map(
            fn (string $next) => ['title' => $destinations[$next]['title'], 'icon' => $destinations[$next]['icon'], 'url' => route($next, [], false)],
            array_values(array_filter($recommended, fn (string $next) => $next !== $route)),
        ));

        return Inertia::render('destination', [
            ...$destinations[$route],
            'href' => 'https://scaleupmap.com'.$destinations[$route]['path'],
            'because' => $router->reasonFor($user, $route),
            'position' => array_search($route, $recommended, true) === false ? null : array_search($route, $recommended, true) + 1,
            'count' => count($recommended),
            'nextUp' => $nextUp,
        ]);
    }

    /** @return array<string, array{path: string, title: string, icon: string, blurb: string, first_action: string}> */
    private function destinations(): array
    {
        return require app_path('Onboarding/destinations.php');
    }
}
