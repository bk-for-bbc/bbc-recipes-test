<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['prefix' => 'api'], function() {
    Route::get('recipes', function() {
        return App\Recipe::with('ingredients')->get();
    });

    Route::get('recipes/{slug}', function($slug) {
        return App\Recipe::where('slug', $slug)->with('ingredients')->firstOrFail();
    });

    Route::get('me/starred', function() {
        return App\User::findOrFail(1)->starred()->with('ingredients')->get();
    });

    Route::post('me/starred/{id}', function($id) {
        App\User::findOrFail(1)->starred()->attach($id);
        return [(int) $id];
    });

    Route::delete('me/starred/{id}', function($id) {
        App\User::findOrFail(1)->starred()->detach($id);
        return [];
    });
});

Route::get('{catchall}', function() {
    return view('app');
})->where('catchall', '(.*)');
