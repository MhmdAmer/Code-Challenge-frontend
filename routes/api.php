<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\VerificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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



Route::get('email/verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify');

Route::post('/register', [RegisterController::class, 'register']);
Route::post('login', [AuthController::class, "login"]);
Route::group([

    'middleware' => 'auth',

], function () {

    Route::get('customers', [CustomerController::class, "getCustomers"]);
    Route::get('average', [CustomerController::class, "getAverageRegistrations"]);
    Route::post('logout', [AuthController::class, "logout"]);
});
