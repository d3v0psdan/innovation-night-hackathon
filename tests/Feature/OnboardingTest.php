<?php

use App\Models\User;

it('sends a new user to step 1', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('dashboard'))
        ->assertRedirect(route('onboarding.show', 1));
});

it('saves an answer and moves to the next step', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('onboarding.store', 1), ['answer' => 'building_mvp'])
        ->assertRedirect(route('onboarding.show', 2));

    expect($user->fresh()->onboarding)->toBe(['journey_stage' => 'building_mvp']);
});

it('rejects an answer that is not an option and saves nothing', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->from(route('onboarding.show', 1))
        ->post(route('onboarding.store', 1), ['answer' => 'hacked'])
        ->assertRedirect(route('onboarding.show', 1))
        ->assertSessionHasErrors(['answer' => 'The selected answer is invalid.']);

    expect($user->fresh()->onboarding)->toBeNull()
        ->and($user->fresh()->onboarded_at)->toBeNull();
});

it('saves several goals on the multi pick step', function () {
    $user = User::factory()->create(['onboarding' => ['journey_stage' => 'early_traction']]);

    $this->actingAs($user)
        ->post(route('onboarding.store', 2), ['answer' => ['raise_funding', 'find_funding']])
        ->assertRedirect(route('onboarding.show', 3));

    expect($user->fresh()->onboarding['goal'])->toBe(['raise_funding', 'find_funding']);
});

it('rejects an empty or unknown goal list', function () {
    $user = User::factory()->create(['onboarding' => ['journey_stage' => 'early_traction']]);

    $this->actingAs($user)->post(route('onboarding.store', 2), ['answer' => []])->assertSessionHasErrors('answer');
    $this->actingAs($user)->post(route('onboarding.store', 2), ['answer' => ['hacked']])->assertSessionHasErrors('answer.0');
    expect($user->fresh()->onboarding)->not->toHaveKey('goal');
});

it('shows the landing tool with the other matches as next up', function () {
    $user = User::factory()->create(['onboarding' => ['journey_stage' => 'early_traction', 'goal' => ['raise_funding', 'find_funding']], 'onboarded_at' => now()]);

    $this->actingAs($user)->get(route('destination.memo'))
        ->assertInertia(fn ($page) => $page->component('destination')
            ->where('title', 'Investment memo')
            ->where('position', 1)
            ->where('count', 2)
            ->where('nextUp.0.title', 'Investor directory'));
});

it('routes to the destination after the last step', function () {
    $user = User::factory()->create(['onboarding' => ['journey_stage' => 'early_traction', 'goal' => ['raise_funding']]]);

    $this->actingAs($user)
        ->post(route('onboarding.store', 3), ['answer' => 'solo'])
        ->assertRedirect(route('destination.memo'));

    $this->actingAs($user->fresh())->get(route('destination.memo'))->assertOk();
    expect($user->fresh()->onboarded_at)->not->toBeNull();
});

it('sends an onboarded user from the dashboard to their first tool', function () {
    $user = User::factory()->create(['onboarding' => ['goal' => ['find_funding']], 'onboarded_at' => now()]);

    $this->actingAs($user)->get(route('dashboard'))->assertRedirect(route('destination.investors'));
});

it('sends a user who skips ahead back to the first unanswered step', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('onboarding.store', 3), ['answer' => 'solo'])
        ->assertRedirect(route('onboarding.show', 1));
});

it('lets a new registration reach onboarding without email verification', function () {
    $this->post('/register', [
        'name' => 'Live Demo',
        'email' => 'live@demo.test',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertRedirect(route('dashboard'));

    $this->get(route('dashboard'))->assertRedirect(route('onboarding.show', 1));
});
