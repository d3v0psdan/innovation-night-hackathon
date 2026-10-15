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
            ['Maya Okafor', 'maya@demo.test', ['journey_stage' => 'raising_first_round', 'goal' => ['raise_funding', 'find_funding'], 'team_size' => '2_5']],
            ['Sam Delacroix', 'sam@demo.test', ['journey_stage' => 'building_mvp', 'goal' => ['validate_direction'], 'team_size' => 'solo']],
            ['Priya Natarajan', 'priya@demo.test', ['journey_stage' => 'early_traction', 'goal' => ['investor_blind_spots', 'win_customers'], 'team_size' => '6_10']],
            ['Jonas Lindqvist', 'jonas@demo.test', ['journey_stage' => 'scaling_post_seed', 'goal' => ['find_funding'], 'team_size' => '11_plus']],
            ['Aisha Rahman', 'aisha@demo.test', ['journey_stage' => 'pivoting', 'goal' => ['execution_focus'], 'team_size' => '2_5']],
        ];

        foreach ($founders as [$name, $email, $answers]) {
            User::factory()->create(['name' => $name, 'email' => $email, 'onboarding' => $answers, 'onboarded_at' => now()]);
        }

        // Maya opened the memo and stopped: routing worked, the tool did not stick yet
        User::where('email', 'maya@demo.test')->update(['tutorial_opened' => json_encode(['destination.memo'])]);

        // Finished every recommended tool, lands on the dashboard checklist
        User::factory()->create(['name' => 'Omar Haddad', 'email' => 'omar@demo.test', 'onboarding' => ['journey_stage' => 'early_traction', 'goal' => ['raise_funding', 'find_funding'], 'team_size' => '2_5'], 'onboarded_at' => now()->subDays(5), 'tutorial_opened' => ['destination.memo', 'destination.investors'], 'tutorial_done' => ['destination.memo', 'destination.investors'], 'tutorial_completed_at' => now()->subDays(4)]);

        // Onboarded three days ago and never opened a tool: the re-engagement email target
        User::factory()->create(['name' => 'Lena Fischer', 'email' => 'stalled@demo.test', 'onboarding' => ['journey_stage' => 'building_mvp', 'goal' => ['execution_focus', 'win_customers'], 'team_size' => 'solo'], 'onboarded_at' => now()->subDays(3)]);

        User::factory()->create(['name' => 'Fresh Founder', 'email' => 'fresh@demo.test']);
    }
}
