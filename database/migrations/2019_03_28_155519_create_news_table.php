<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('url', 1000)->nullable();
            $table->string('urlToImage', 1000)->nullable();
            $table->string('content', 1000)->nullable();
            $table->string('author', 300)->nullable();
            $table->string('source', 300)->nullable();
            $table->string('title', 300)->nullable();
            $table->string('publishedAt', 300)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news');
    }
}
