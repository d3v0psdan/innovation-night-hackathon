<?php

namespace App\Http\Controllers;

use App\Onboarding\OnboardingRouter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class OnboardingController extends Controller
{
    public function show(Request $request, int $step): Response|RedirectResponse
    {
        $questions = $this->questions();
        abort_unless(isset($questions[$step - 1]), 404);

        if ($redirect = $this->firstUnansweredBefore($request, $step)) {
            return $redirect;
        }

        return Inertia::render('onboarding/step', [
            'step' => $step,
            'total' => count($questions),
            'question' => $questions[$step - 1],
            'answer' => $request->user()->onboarding[$questions[$step - 1]['key']] ?? '',
        ]);
    }

    public function store(Request $request, int $step, OnboardingRouter $router): RedirectResponse
    {
        $questions = $this->questions();
        abort_unless(isset($questions[$step - 1]), 404);
        if ($redirect = $this->firstUnansweredBefore($request, $step)) {
            return $redirect;
        }
        $question = $questions[$step - 1];

        $validated = $request->validate([
            'answer' => ['required', Rule::in(array_keys($question['options']))],
        ]);

        $user = $request->user();
        $user->onboarding = [...($user->onboarding ?? []), $question['key'] => $validated['answer']];

        if ($step < count($questions)) {
            $user->save();

            return redirect()->route('onboarding.show', ['step' => $step + 1]);
        }

        $user->onboarded_at = now();
        $user->save();

        return redirect()->route($router->destinationFor($user));
    }

    /** Steps must be answered in order, so a typed URL cannot skip ahead. */
    private function firstUnansweredBefore(Request $request, int $step): ?RedirectResponse
    {
        $answers = $request->user()->onboarding ?? [];

        foreach (array_slice($this->questions(), 0, $step - 1) as $index => $question) {
            if (! isset($answers[$question['key']])) {
                return redirect()->route('onboarding.show', ['step' => $index + 1]);
            }
        }

        return null;
    }

    private function questions(): array
    {
        return require app_path('Onboarding/questions.php');
    }
}
