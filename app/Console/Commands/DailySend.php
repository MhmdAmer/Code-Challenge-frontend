<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class DailySend extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'quote:Daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send Daily Number of Registrations';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        Mail::raw(DB::table('users')->where('roles', 'user')->where('created_at', '>', Carbon::now()->subDay())->count(), function ($message) {
            $message->from('mohamad.h.aamer@gmail.com', "Daily Registration Summary");
            $message->to('mohamadamer303@gmail.com');
        });
        $this->info('Successfully sent daily quote to everyone.');
    }
}
