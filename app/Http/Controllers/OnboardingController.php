<?php

namespace App\Http\Controllers;

use App\Models\User;
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

        $question = $questions[$step - 1];
        $saved = $request->user()->onboarding[$question['key']] ?? null;

        return Inertia::render('onboarding/step', [
            'step' => $step,
            'total' => count($questions),
            'question' => $question + ['multiple' => false],
            'answer' => ($question['multiple'] ?? false) ? (array) ($saved ?? []) : ($saved ?? ''),
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
        $option = Rule::in(array_keys($question['options']));

        $messages = [
            'answer.required' => ($question['multiple'] ?? false) ? 'Pick at least one option to continue.' : 'Pick one option to continue.',
            'answer.in' => 'Pick one of the options shown.',
            'answer.*.in' => 'Pick only from the options shown.',
            'answer.*.distinct' => 'Each option can only be picked once.',
        ];

        $validated = ($question['multiple'] ?? false)
            ? $request->validate(['answer' => ['required', 'array', 'min:1'], 'answer.*' => ['string', 'distinct', $option]], $messages)
            : $request->validate(['answer' => ['required', 'string', $option]], $messages);

        $user = $request->user();
        $user->onboarding = [...($user->onboarding ?? []), $question['key'] => $validated['answer']];

        if ($step < count($questions)) {
            $user->save();

            return redirect()->route('onboarding.show', ['step' => $step + 1]);
        }

        $user->onboarded_at = now();
        $this->resetTutorialProgress($user, $router);
        $user->save();

        return redirect()->route($router->destinationFor($user));
    }

    /** New answers may add tools. Keep what is still recommended as done, reopen the tutorial, allow one more re-engagement email. */
    private function resetTutorialProgress(User $user, OnboardingRouter $router): void
    {
        $recommended = $router->recommendationsFor($user);
        $user->tutorial_done = array_values(array_intersect($user->tutorial_done ?? [], $recommended));
        $user->tutorial_completed_at = array_diff($recommended, $user->tutorial_done) === [] && $recommended !== [] ? $user->tutorial_completed_at : null;
        $user->re_engaged_at = null;
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

    /** @return array<int, array{key: string, label: string, options: array<string, string>, multiple?: bool}> */
    private function questions(): array
    {
        return require app_path('Onboarding/questions.php');
    }
}
