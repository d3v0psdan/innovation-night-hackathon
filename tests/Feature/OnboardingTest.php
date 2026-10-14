<?php

use App\Models\User;

it('sends a new user to step 1', function () {
    $this->actingAs(User::factory()->create())
        ->get('/dashboard')
        ->assertRedirect('/onboarding/1');
});

it('saves an answer and moves to the next step', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/onboarding/1', ['answer' => 'building_mvp'])
        ->assertRedirect('/onboarding/2');

    expect($user->fresh()->onboarding)->toBe(['journey_stage' => 'building_mvp']);
});

it('rejects an answer that is not an option', function () {
    $this->actingAs(User::factory()->create())
        ->from('/onboarding/1')
        ->post('/onboarding/1', ['answer' => 'hacked'])
        ->assertRedirect('/onboarding/1')
        ->assertSessionHasErrors('answer');
});

it('routes to the destination after the last step', function () {
    $user = User::factory()->create(['onboarding' => ['journey_stage' => 'early_traction', 'goal' => 'raise_funding']]);

    $this->actingAs($user)
        ->post('/onboarding/3', ['answer' => 'solo'])
        ->assertRedirect('/dashboard/memo');

    $this->actingAs($user->fresh())->get('/dashboard/memo')->assertOk();
    expect($user->fresh()->onboarded_at)->not->toBeNull();
});
