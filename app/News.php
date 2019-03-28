<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $table = "news";

    /**
     * Attributes that are mass assigned
    */
    protected $fillable =[
        'url',
        'urlToImage',
        'contents',
        'author',
        'source',
        'title',
        'publishedAt'
    ];
}
