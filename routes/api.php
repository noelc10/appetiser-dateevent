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

Route::group(['prefix' => 'v1'], function() {
    Route::group(['prefix' => 'auth'], function ($router) {
        Route::post('login', 'Api\Auth\AuthController@login');
        Route::post('logout', 'Api\Auth\AuthController@logout');
        Route::post('refresh', 'Api\Auth\AuthController@refresh');
        Route::post('me', 'Api\Auth\AuthController@me');
    });

    Route::post('/save-event', 'Api\EventsController@saveEvent');
});

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
