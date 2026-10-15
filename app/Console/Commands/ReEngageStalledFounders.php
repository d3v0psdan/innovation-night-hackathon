<?php

namespace App\Console\Commands;

use App\Mail\ReEngageFounder;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class ReEngageStalledFounders extends Command
{
    protected $signature = 'onboarding:re-engage {--hours=48 : How long a founder can sit on the survey before we write}';

    protected $description = 'Email founders who finished the survey, never opened a tool, and have not been written to yet';

    public function handle(): int
    {
        $stalled = User::query()
            ->whereNotNull('onboarded_at')
            ->where('onboarded_at', '<=', now()->subHours((int) $this->option('hours')))
            ->whereNull('tutorial_completed_at')
            ->whereNull('re_engaged_at')
            ->where(fn ($query) => $query->whereNull('tutorial_opened')->orWhereJsonLength('tutorial_opened', 0))
            ->get();

        foreach ($stalled as $founder) {
            Mail::to($founder)->send(new ReEngageFounder($founder));
            $founder->forceFill(['re_engaged_at' => now()])->save();
            $this->line("Wrote to {$founder->email}");
        }

        $this->info("{$stalled->count()} founder(s) re-engaged.");

        return self::SUCCESS;
    }
}
