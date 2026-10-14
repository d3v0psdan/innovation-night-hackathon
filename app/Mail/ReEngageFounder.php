<?php

namespace App\Mail;

use App\Models\User;
use App\Onboarding\OnboardingRouter;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReEngageFounder extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public User $founder) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Your first ScaleupMap tool is still waiting, '.explode(' ', $this->founder->name)[0]);
    }

    public function content(): Content
    {
        $router = new OnboardingRouter;
        $destinations = require app_path('Onboarding/destinations.php');
        $done = $this->founder->tutorial_done ?? [];
        $next = collect($router->recommendationsFor($this->founder))->first(fn (string $route) => ! in_array($route, $done, true)) ?? 'dashboard';

        return new Content(markdown: 'mail.re-engage', with: [
            'firstName' => explode(' ', $this->founder->name)[0],
            'tool' => $destinations[$next],
            'because' => $router->reasonFor($this->founder, $next),
            'url' => route($next),
            'daysAgo' => (int) $this->founder->onboarded_at->diffInDays(now()),
        ]);
    }
}
