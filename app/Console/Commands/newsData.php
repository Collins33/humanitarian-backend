<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
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
       $client = new Client();
       // make api call to news api
       $result = $client->request('GET', 'https://newsapi.org/v2/everything?q=kenya&apiKey=f6dce1d67d0a4e94a03a795bb892c499');
       $data = $result->getBody();
       $obj_data = json_decode($data);
       $data_array = $obj_data->articles;
       foreach($data_array as $item)
       {
        //var_dump($item->author);
        News::Create([
               'url' => $item->url,
               'urlToImage'=>$item->urlToImage,
               'content' => $item->content,
               'author' => $item->author,
               'source' => $item->author,
               'title'=> $item->title,
               'publishedAt' =>  $item->publishedAt
        ]);
        echo 'Completed';

    }
    }

}
