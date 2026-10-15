<?php

// One-off generator for database/seeders/founders.json. Run: php.bat database/seeders/generate-founders.php
require __DIR__.'/../../vendor/autoload.php';
$app = require __DIR__.'/../../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use App\Onboarding\OnboardingRouter;
use Illuminate\Support\Carbon;

$faker = Faker\Factory::create();
$faker->seed(2026);
$questions = require app_path('Onboarding/questions.php');
$options = fn (string $key) => array_keys(collect($questions)->firstWhere('key', $key)['options']);
$router = new OnboardingRouter;
$now = Carbon::parse('2026-10-14 18:00:00');

$rows = [];
for ($i = 1; $i <= 500; $i++) {
    $createdAt = $now->copy()->subDays($faker->numberBetween(0, 90))->subMinutes($faker->numberBetween(0, 1440));
    $row = [
        'name' => $faker->name(),
        'email' => "founder{$i}@filler.test",
        'password' => 'password',
        'email_verified_at' => $faker->boolean(90) ? $createdAt->toDateTimeString() : null,
        'onboarding' => null,
        'onboarded_at' => null,
        'tutorial_done' => null,
        'tutorial_completed_at' => null,
        're_engaged_at' => null,
        'created_at' => $createdAt->toDateTimeString(),
    ];

    // 15% registered but never answered the three questions
    if ($faker->boolean(15)) {
        $rows[] = $row;
        continue;
    }

    $row['onboarding'] = [
        'journey_stage' => $faker->randomElement($options('journey_stage')),
        'goal' => $faker->randomElements($options('goal'), $faker->numberBetween(1, 3)),
        'team_size' => $faker->randomElement($options('team_size')),
    ];
    $onboardedAt = $createdAt->copy()->addMinutes($faker->numberBetween(2, 30));
    $row['onboarded_at'] = $onboardedAt->toDateTimeString();

    $recommended = $router->recommendationsFor(new User(['onboarding' => $row['onboarding']]));
    $doneCount = $faker->randomElement([0, 0, 0, 1, 1, 'all']);
    $done = $doneCount === 'all' ? $recommended : array_slice($recommended, 0, $doneCount);

    if ($done !== []) {
        $row['tutorial_done'] = $done;
    }
    if ($done !== [] && count($done) === count($recommended)) {
        $row['tutorial_completed_at'] = $onboardedAt->copy()->addDays($faker->numberBetween(0, 10))->toDateTimeString();
    }
    // Stalled: onboarded 3+ days ago, nothing done, half already got the re-engage email
    if ($done === [] && $onboardedAt->lt($now->copy()->subDays(3)) && $faker->boolean(50)) {
        $row['re_engaged_at'] = $onboardedAt->copy()->addDays(3)->toDateTimeString();
    }

    $rows[] = $row;
}

file_put_contents(__DIR__.'/founders.json', json_encode($rows, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)."\n");
echo count($rows)." founders written\n";
