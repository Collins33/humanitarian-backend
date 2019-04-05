<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['prefix'=>'v1'], function(){
    // Route::get('news', ['as'=>'news', function(){
    //     return App\News::all();
    // }]);
    Route::resource('news', 'NewsController', ['only'=>['index', 'show']]);
});

// authentication routes
Route::group(['prefix'=>'v1/auth',
'middleware'=>'api'
], 
function()
{
Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');
Route::post('logout', 'AuthController@logout');
Route::post('refresh', 'AuthController@refresh');
Route::post('me', 'AuthController@me');
});


