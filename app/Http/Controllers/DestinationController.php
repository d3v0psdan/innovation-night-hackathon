<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Onboarding\OnboardingRouter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DestinationController extends Controller
{
    /** The dashboard sends a founder to the next tool they have not done yet. Nothing left means the dashboard itself. */
    public function dashboard(Request $request, OnboardingRouter $router): Response|RedirectResponse
    {
        $next = $this->nextUndone($request, $router);

        return $next === null ? $this->show($request, $router, 'dashboard') : redirect()->route($next);
    }

    /** One tutorial step: why you are here, what the tool does, the first action, and the checklist of every recommended tool. */
    public function show(Request $request, OnboardingRouter $router, string $route): Response
    {
        $destinations = $this->destinations();
        $user = $request->user();
        $done = $user->tutorial_done ?? [];
        $recommended = $router->recommendationsFor($user);
        $opened = $this->recordOpened($user, $route, $recommended);

        $checklist = array_map(fn (string $name) => [
            'title' => $destinations[$name]['title'],
            'icon' => $destinations[$name]['icon'],
            'url' => route($name, [], false),
            'done' => in_array($name, $done, true),
            'opened' => in_array($name, $opened, true),
            'current' => $name === $route,
        ], $recommended);

        return Inertia::render('destination', [
            ...$destinations[$route],
            'route' => $route,
            'href' => 'https://scaleupmap.com'.$destinations[$route]['path'],
            'because' => $router->reasonFor($user, $route),
            'done' => in_array($route, $done, true),
            'allDone' => $user->tutorial_completed_at !== null,
            'checklist' => $checklist,
        ]);
    }

    /** Marks the tool done and moves the founder on to the next recommended tool, or the dashboard when none is left. */
    public function done(Request $request, OnboardingRouter $router, string $route): RedirectResponse
    {
        $user = $request->user();
        abort_unless(in_array($route, $router->recommendationsFor($user), true), 404);
        $user->tutorial_done = array_values(array_unique([...($user->tutorial_done ?? []), $route]));

        $next = $this->nextUndone($request, $router);
        if ($next === null) {
            $user->tutorial_completed_at ??= now();
        }
        $user->save();

        return redirect()->route($next ?? 'dashboard');
    }

    /**
     * Tracks whether routing worked: the first visit to a recommended tool is stored once.
     *
     * @param  list<string>  $recommended
     * @return list<string>
     */
    private function recordOpened(User $user, string $route, array $recommended): array
    {
        $opened = $user->tutorial_opened ?? [];
        if (in_array($route, $recommended, true) && ! in_array($route, $opened, true)) {
            $opened = [...$opened, $route];
            $user->tutorial_opened = $opened;
            $user->save();
        }

        return $opened;
    }

    private function nextUndone(Request $request, OnboardingRouter $router): ?string
    {
        $user = $request->user();
        $done = $user->tutorial_done ?? [];

        foreach ($router->recommendationsFor($user) as $route) {
            if (! in_array($route, $done, true)) {
                return $route;
            }
        }

        return null;
    }

    /** @return array<string, array{path: string, title: string, icon: string, blurb: string, first_action: string}> */
    private function destinations(): array
    {
        return require app_path('Onboarding/destinations.php');
    }
}
