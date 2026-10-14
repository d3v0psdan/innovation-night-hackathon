<?php

namespace App\Onboarding;

use App\Models\User;

class OnboardingRouter
{
    /** Ordered rules. First match wins. The last rule has no match and is the fallback. */
    private const RULES = [
        ['match' => ['goal' => 'find_funding'], 'route' => 'destination.investors', 'because' => 'you want to find investors and funding'],
        ['match' => ['goal' => 'raise_funding'], 'route' => 'destination.memo', 'because' => 'raising feels overwhelming'],
        ['match' => ['goal' => 'investor_blind_spots'], 'route' => 'destination.score', 'because' => 'you want to know what investors will see'],
        ['match' => ['goal' => 'validate_direction'], 'route' => 'destination.map', 'because' => 'you are unsure about direction'],
        ['match' => ['goal' => 'execution_focus'], 'route' => 'destination.sprint', 'because' => 'you need weekly focus'],
        ['match' => ['goal' => 'win_customers'], 'route' => 'destination.sprint', 'because' => 'you want traction and customers'],
        ['match' => [], 'route' => 'dashboard', 'because' => 'you are ready to explore'],
    ];

    public function destinationFor(User $user): string
    {
        return $this->ruleFor($user)['route'];
    }

    public function reasonFor(User $user): string
    {
        return 'Because you said '.$this->ruleFor($user)['because'].'.';
    }

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
}
