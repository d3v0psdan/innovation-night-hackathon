<?php

use App\Models\User;
use Database\Seeders\DemoSeeder;

it('walks a fresh founder through onboarding to the investment memo', function () {
    $this->actingAs(User::factory()->create());

    $page = visit('/dashboard')->on()->mobile();

    $page->assertPathIs('/onboarding/1')
        ->assertSee('Step 1 of 3')
        ->assertNoJavaScriptErrors()
        ->assertNoAccessibilityIssues();

    $page->click('Raising a first round')->click('Continue')
        ->assertSee('Step 2 of 3')
        ->click('Raising feels overwhelming')->click('Finding investors and funding')->click('Continue')
        ->assertSee('Step 3 of 3')
        ->click('2 to 5 people')->click('Continue')
        ->assertPathIs('/dashboard/memo')
        ->assertSee('Investment memo')
        ->assertSee('Because you said "Raising feels overwhelming"')
        ->assertSee('Next up')
        ->assertSee('Investor directory')
        ->assertNoJavaScriptErrors()
        ->assertNoAccessibilityIssues();
});

it('lands each seeded founder on a different first tool', function (string $email, string $path) {
    $this->seed(DemoSeeder::class);
    $this->actingAs(User::where('email', $email)->firstOrFail());

    visit($path)->assertPathIs($path)->assertSee('Because you said');
})->with([
    'maya raise_funding lands on the memo' => ['maya@demo.test', '/dashboard/memo'],
    'sam validate_direction lands on the journey map' => ['sam@demo.test', '/coach'],
    'priya investor_blind_spots lands on the score' => ['priya@demo.test', '/dashboard/score'],
    'jonas find_funding lands on the investor directory' => ['jonas@demo.test', '/entities'],
    'aisha pivoting lands on the journey map' => ['aisha@demo.test', '/coach'],
]);
