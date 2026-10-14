<?php

use App\Mail\ReEngageFounder;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

function stalledFounder(array $overrides = []): User
{
    return User::factory()->create([
        'onboarding' => ['journey_stage' => 'building_mvp', 'goal' => ['execution_focus']],
        'onboarded_at' => now()->subDays(3),
        ...$overrides,
    ]);
}

it('emails founders who finished the survey days ago and never opened a tool, once', function () {
    Mail::fake();
    $stalled = stalledFounder();
    stalledFounder(['tutorial_done' => ['destination.sprint'], 'tutorial_completed_at' => now()]);
    stalledFounder(['onboarded_at' => now()->subHours(2)]);
    stalledFounder(['re_engaged_at' => now()->subDay()]);
    User::factory()->create();

    $this->artisan('onboarding:re-engage')->assertSuccessful();
    $this->artisan('onboarding:re-engage')->assertSuccessful();

    Mail::assertSent(ReEngageFounder::class, 1);
    Mail::assertSent(ReEngageFounder::class, fn (ReEngageFounder $mail) => $mail->hasTo($stalled->email));
    expect($stalled->fresh()->re_engaged_at)->not->toBeNull();
});

it('names the next tool and quotes the answer in the email', function () {
    $stalled = stalledFounder();

    $html = (new ReEngageFounder($stalled))->render();

    expect($html)->toContain('North Star Sprint')
        ->toContain('Because you said "I need weekly focus".')
        ->toContain(route('destination.sprint'));
});

it('previews the email in the browser for a logged in user', function () {
    $stalled = stalledFounder();

    $this->actingAs($stalled)->get(route('mail.re-engage', $stalled))->assertOk()->assertSee('North Star Sprint');
});
