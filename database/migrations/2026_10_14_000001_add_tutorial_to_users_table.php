<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->json('tutorial_done')->nullable()->comment('Route names of recommended tools the founder marked done');
            $table->timestamp('tutorial_completed_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['tutorial_done', 'tutorial_completed_at']);
        });
    }
};
