<?php

namespace App\Onboarding;

use App\Models\User;

class OnboardingRouter
{
    /**
     * Ordered rules. Every rule that matches is a recommended tool, in this order. The first is the landing tool.
     * Stage rules come first so a founder with no venture yet is sent to the map whatever their goals.
     *
     * @var array<int, array{match: array<string, string>, route: string}>
     */
    private const RULES = [
        ['match' => ['journey_stage' => 'looking_for_idea'], 'route' => 'destination.map'],
        ['match' => ['journey_stage' => 'pivoting'], 'route' => 'destination.map'],
        ['match' => ['goal' => 'raise_funding'], 'route' => 'destination.memo'],
        ['match' => ['goal' => 'find_funding'], 'route' => 'destination.investors'],
        ['match' => ['goal' => 'investor_blind_spots'], 'route' => 'destination.score'],
        ['match' => ['goal' => 'validate_direction'], 'route' => 'destination.map'],
        ['match' => ['goal' => 'execution_focus'], 'route' => 'destination.sprint'],
        ['match' => ['goal' => 'win_customers'], 'route' => 'destination.sprint'],
    ];

    private const FALLBACK = 'dashboard';

    public function destinationFor(User $user): string
    {
        return $this->recommendationsFor($user)[0] ?? self::FALLBACK;
    }

    /** Route names of every tool the answers call for, landing tool first, no duplicates. */
    public function recommendationsFor(User $user): array
    {
        $routes = [];

        foreach ($this->matchingRules($user) as $rule) {
            $routes[$rule['route']] = true;
        }

        return array_keys($routes);
    }

    /** Quotes the option label the founder actually picked for the given tool, so the reason never paraphrases. */
    public function reasonFor(User $user, ?string $route = null): string
    {
        $route ??= $this->destinationFor($user);

        foreach ($this->matchingRules($user) as $rule) {
            if ($rule['route'] === $route) {
                $key = array_key_first($rule['match']);

                return 'Because you said "'.$this->optionLabel($key, $rule['match'][$key]).'".';
            }
        }

        return 'No strong signal yet, so we start you on the dashboard.';
    }

    /** @return array<int, array{match: array<string, string>, route: string}> */
    private function matchingRules(User $user): array
    {
        $answers = $user->onboarding ?? [];

        return array_values(array_filter(self::RULES, function (array $rule) use ($answers) {
            foreach ($rule['match'] as $key => $value) {
                $picked = (array) ($answers[$key] ?? []);
                if (! in_array($value, $picked, true)) {
                    return false;
                }
            }

            return true;
        }));
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
