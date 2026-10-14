<?php

use App\Models\User;
use App\Onboarding\OnboardingRouter;

it('sends each goal to its destination', function (array $answers, string $route) {
    $user = new User(['onboarding' => $answers]);

    expect((new OnboardingRouter)->destinationFor($user))->toBe($route);
})->with([
    'find_funding' => [['goal' => 'find_funding'], 'destination.investors'],
    'raise_funding' => [['goal' => 'raise_funding'], 'destination.memo'],
    'investor_blind_spots' => [['goal' => 'investor_blind_spots'], 'destination.score'],
    'validate_direction' => [['goal' => 'validate_direction'], 'destination.map'],
    'execution_focus' => [['goal' => 'execution_focus'], 'destination.sprint'],
    'win_customers' => [['goal' => 'win_customers'], 'destination.sprint'],
    'no answers falls back' => [[], 'dashboard'],
]);
