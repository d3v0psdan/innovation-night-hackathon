<?php

namespace App\Onboarding;

use App\Models\User;

class OnboardingRouter
{
    /**
     * Ordered rules. First match wins. The last rule has no match and is the fallback.
     * Stage rules come first so a founder with no venture yet is sent to the map whatever their goal.
     *
     * @var array<int, array{match: array<string, string>, route: string}>
     */
    private const RULES = [
        ['match' => ['journey_stage' => 'looking_for_idea'], 'route' => 'destination.map'],
        ['match' => ['journey_stage' => 'pivoting'], 'route' => 'destination.map'],
        ['match' => ['goal' => 'find_funding'], 'route' => 'destination.investors'],
        ['match' => ['goal' => 'raise_funding'], 'route' => 'destination.memo'],
        ['match' => ['goal' => 'investor_blind_spots'], 'route' => 'destination.score'],
        ['match' => ['goal' => 'validate_direction'], 'route' => 'destination.map'],
        ['match' => ['goal' => 'execution_focus'], 'route' => 'destination.sprint'],
        ['match' => ['goal' => 'win_customers'], 'route' => 'destination.sprint'],
        ['match' => [], 'route' => 'dashboard'],
    ];

    public function destinationFor(User $user): string
    {
        return $this->ruleFor($user)['route'];
    }

    /** Quotes the option label the founder actually picked, so the reason never paraphrases. */
    public function reasonFor(User $user): string
    {
        $match = $this->ruleFor($user)['match'];

        if ($match === []) {
            return 'No strong signal yet, so we start you on the dashboard.';
        }

        $key = array_key_first($match);
        $label = $this->optionLabel($key, $match[$key]);

        return 'Because you said "'.$label.'".';
    }

    /** @return array{match: array<string, string>, route: string} */
    private function ruleFor(User $user): array
    {
        $answers = $user->onboarding ?? [];

        foreach (self::RULES as $rule) {
            if (array_intersect_assoc($rule['match'], $answers) === $rule['match']) {
                return $rule;
            }
        }

        return end(self::RULES);
    }

    private function optionLabel(string $key, string $value): string
    {
        foreach (require app_path('Onboarding/questions.php') as $question) {
            if ($question['key'] === $key) {
                return $question['options'][$value] ?? $value;
            }
        }

        return $value;
    }
}
