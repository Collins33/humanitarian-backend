<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\News;
class newsData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'add:news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add news to the database';

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
     * @return mixed
     */
    public function handle()
    {  
        $data = ['www.trio.com','charles-barkley-tells-jussie-smolletts-there-are-repercussions-to-actions-we-all-lost-in-this-scenario','static.foxnews.com/foxnews.com/content/uploads/2019/03/Barkley-Smollett-Getty-AP.jpg','Charles Barkley shocked fans in late February when he piled onto allegations that Jussie Smollett faked a hate crime in Chicago','John Doe','Charles Barkley tells Jussie Smollett there are repercussions to actions','2019-03-28T15:17:46Z'];
        $dataCount = count($data);
        for ($i = 0; $i < $dataCount; $i ++){
           News::Create($data);
           echo 'Added successfully';
        };
    }
}
