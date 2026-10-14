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
    public function show(int $step): Response
    {
        $questions = $this->questions();
        abort_unless(isset($questions[$step - 1]), 404);

        return Inertia::render('onboarding/step', [
            'step' => $step,
            'total' => count($questions),
            'question' => $questions[$step - 1],
        ]);
    }

    public function store(Request $request, int $step, OnboardingRouter $router): RedirectResponse
    {
        $questions = $this->questions();
        abort_unless(isset($questions[$step - 1]), 404);
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

    private function questions(): array
    {
        return require app_path('Onboarding/questions.php');
    }
}
