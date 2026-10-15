<?php

use App\Models\User;

function founderAt(array $answers, bool $onboarded = false): User
{
    return User::factory()->create(['onboarding' => $answers ?: null, 'onboarded_at' => $onboarded ? now() : null]);
}

it('A step 1 to 2', function () {
    $this->actingAs(founderAt([]));
    visit('/onboarding/1')->on()->mobile()->assertSee('Step 1 of 3')->click('Raising a first round')->click('Continue')->assertSee('Step 2 of 3');
});

it('B step 2 to 3', function () {
    $this->actingAs(founderAt(['journey_stage' => 'raising_first_round']));
    visit('/onboarding/2')->on()->mobile()->assertSee('Step 2 of 3')->click('Raising feels overwhelming')->click('Finding investors and funding')->click('Continue')->assertSee('Step 3 of 3');
});

it('C step 3 to memo', function () {
    $this->actingAs(founderAt(['journey_stage' => 'raising_first_round', 'goal' => ['raise_funding', 'find_funding']]));
    visit('/onboarding/3')->on()->mobile()->assertSee('Step 3 of 3')->click('2 to 5 people')->click('Continue')->assertPathIs('/dashboard/memo')->assertSee('Your tool 1 of 2');
});

it('D memo done to entities', function () {
    $this->actingAs(founderAt(['journey_stage' => 'raising_first_round', 'goal' => ['raise_funding', 'find_funding'], 'team_size' => '2_5'], true));
    visit('/dashboard/memo')->on()->mobile()->assertSee('Your tool 1 of 2')->click('Done, show next tool')->assertPathIs('/entities')->assertSee('Your tool 2 of 2');
});
