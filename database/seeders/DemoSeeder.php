<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    /** One founder per destination, plus one fresh founder for the live onboarding demo. */
    public function run(): void
    {
        $founders = [
            ['Maya Okafor', 'maya@demo.test', ['journey_stage' => 'raising_first_round', 'goal' => 'raise_funding', 'team_size' => '2_5']],
            ['Sam Delacroix', 'sam@demo.test', ['journey_stage' => 'building_mvp', 'goal' => 'validate_direction', 'team_size' => 'solo']],
            ['Priya Natarajan', 'priya@demo.test', ['journey_stage' => 'early_traction', 'goal' => 'investor_blind_spots', 'team_size' => '6_10']],
            ['Jonas Lindqvist', 'jonas@demo.test', ['journey_stage' => 'scaling_post_seed', 'goal' => 'find_funding', 'team_size' => '11_plus']],
            ['Aisha Rahman', 'aisha@demo.test', ['journey_stage' => 'pivoting', 'goal' => 'execution_focus', 'team_size' => '2_5']],
        ];

        foreach ($founders as [$name, $email, $answers]) {
            User::factory()->create(['name' => $name, 'email' => $email, 'onboarding' => $answers, 'onboarded_at' => now()]);
        }

        User::factory()->create(['name' => 'Fresh Founder', 'email' => 'fresh@demo.test']);
    }
}
