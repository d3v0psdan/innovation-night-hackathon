<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $user = User::factory()->create(['onboarded_at' => now()]);
        $this->actingAs($user);

        $response = $this->get(route('dashboard'));
        $response->assertOk();
    }

    public function test_dashboard_lists_the_founders_answers_and_tools_once_every_tool_is_done()
    {
        $user = User::factory()->create([
            'onboarded_at' => now(),
            'onboarding' => ['journey_stage' => 'early_traction', 'goal' => ['raise_funding'], 'team_size' => '2_5'],
            'tutorial_done' => ['destination.memo'],
        ]);

        $this->actingAs($user)->get(route('dashboard'))
            ->assertInertia(fn ($page) => $page->component('dashboard')
                ->where('answers.0.answer', 'Early traction')
                ->where('answers.1.answer', 'Raising feels overwhelming')
                ->where('tools.0.title', 'Investment memo')
                ->where('tools.0.done', true));
    }
}
