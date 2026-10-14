<?php

use App\Models\User;

function founderWithTwoTools(array $done = []): User
{
    return User::factory()->create([
        'onboarding' => ['journey_stage' => 'early_traction', 'goal' => ['raise_funding', 'find_funding']],
        'onboarded_at' => now(),
        'tutorial_done' => $done,
    ]);
}

it('moves to the next recommended tool when one is marked done', function () {
    $user = founderWithTwoTools();

    $this->actingAs($user)
        ->post(route('tutorial.done', 'destination.memo'))
        ->assertRedirect(route('destination.investors'));

    expect($user->fresh()->tutorial_done)->toBe(['destination.memo'])
        ->and($user->fresh()->tutorial_completed_at)->toBeNull();
});

it('completes the tutorial and lands on the dashboard after the last tool', function () {
    $user = founderWithTwoTools(['destination.memo']);

    $this->actingAs($user)
        ->post(route('tutorial.done', 'destination.investors'))
        ->assertRedirect(route('dashboard'));

    expect($user->fresh()->tutorial_completed_at)->not->toBeNull();

    $this->actingAs($user->fresh())->get(route('dashboard'))
        ->assertInertia(fn ($page) => $page->component('destination')
            ->where('title', 'Dashboard')
            ->where('allDone', true)
            ->where('checklist.0.done', true)
            ->where('checklist.1.done', true));
});

it('sends the dashboard to the first tool not done yet', function () {
    $this->actingAs(founderWithTwoTools(['destination.memo']))
        ->get(route('dashboard'))
        ->assertRedirect(route('destination.investors'));
});

it('rejects marking an unknown tool done', function () {
    $this->actingAs(founderWithTwoTools())
        ->post(route('tutorial.done', 'destination.nope'))
        ->assertNotFound();
});
