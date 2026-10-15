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

it('refuses to mark a tool done that was never recommended', function () {
    $this->actingAs(founderWithTwoTools())
        ->post(route('tutorial.done', 'destination.score'))
        ->assertNotFound();
});

it('reopens the tutorial when new answers add a tool, keeping what is still done', function () {
    $user = founderWithTwoTools(['destination.memo', 'destination.investors']);
    $user->forceFill(['tutorial_completed_at' => now(), 're_engaged_at' => now()])->save();

    $this->actingAs($user)->post(route('onboarding.store', 1), ['answer' => 'early_traction']);
    $this->actingAs($user)->post(route('onboarding.store', 2), ['answer' => ['raise_funding', 'investor_blind_spots']]);
    $this->actingAs($user)->post(route('onboarding.store', 3), ['answer' => 'solo'])->assertRedirect(route('destination.memo'));

    $fresh = $user->fresh();
    expect($fresh->tutorial_done)->toBe(['destination.memo'])
        ->and($fresh->tutorial_completed_at)->toBeNull()
        ->and($fresh->re_engaged_at)->toBeNull();
});

it('records a recommended tool as opened once when the founder visits it', function () {
    $user = founderWithTwoTools();

    $this->actingAs($user)->get(route('destination.memo'))->assertOk();
    $this->actingAs($user)->get(route('destination.memo'))->assertOk();

    expect($user->fresh()->tutorial_opened)->toBe(['destination.memo']);
});

it('does not record a tool that was not recommended', function () {
    $user = founderWithTwoTools();

    $this->actingAs($user)->get(route('destination.sprint'))->assertOk();

    expect($user->fresh()->tutorial_opened)->toBeNull();
});
