<?php

use App\Models\User;
use App\Onboarding\OnboardingRouter;

it('sends each founder to the destination their answers call for', function (array $answers, string $route) {
    $user = new User(['onboarding' => $answers]);

    expect((new OnboardingRouter)->destinationFor($user))->toBe($route);
})->with([
    'goal find_funding goes to the investor directory' => [['goal' => ['find_funding']], 'destination.investors'],
    'goal raise_funding goes to the memo' => [['goal' => ['raise_funding']], 'destination.memo'],
    'goal investor_blind_spots goes to the score' => [['goal' => ['investor_blind_spots']], 'destination.score'],
    'goal validate_direction goes to the journey map' => [['goal' => ['validate_direction']], 'destination.map'],
    'goal execution_focus goes to the sprint' => [['goal' => ['execution_focus']], 'destination.sprint'],
    'goal win_customers goes to the sprint' => [['goal' => ['win_customers']], 'destination.sprint'],
    'a single string goal still works' => [['goal' => 'raise_funding'], 'destination.memo'],
    'stage looking_for_idea beats any goal' => [['journey_stage' => 'looking_for_idea', 'goal' => ['raise_funding']], 'destination.map'],
    'stage pivoting beats any goal' => [['journey_stage' => 'pivoting', 'goal' => ['find_funding']], 'destination.map'],
    'no answers falls back to the dashboard' => [[], 'dashboard'],
]);

it('recommends one tool per matching goal, landing tool first, without duplicates', function () {
    $user = new User(['onboarding' => ['journey_stage' => 'early_traction', 'goal' => ['win_customers', 'raise_funding', 'execution_focus']]]);

    expect((new OnboardingRouter)->recommendationsFor($user))->toBe(['destination.memo', 'destination.sprint']);
});

it('quotes the option label the founder picked as the reason for each tool', function () {
    $router = new OnboardingRouter;
    $user = new User(['onboarding' => ['journey_stage' => 'early_traction', 'goal' => ['raise_funding', 'find_funding']]]);

    expect($router->reasonFor($user))->toBe('Because you said "Raising feels overwhelming".')
        ->and($router->reasonFor($user, 'destination.investors'))->toBe('Because you said "Finding investors and funding".');
});

it('explains the fallback without quoting the founder', function () {
    expect((new OnboardingRouter)->reasonFor(new User))->toBe('No strong signal yet, so we start you on the dashboard.');
});
