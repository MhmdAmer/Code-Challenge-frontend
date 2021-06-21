<?php

namespace App\Http\Controllers\API;


namespace App\Http\Controllers;

use App\Helpers\InputValidationHelper;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{


    public function login()
    {
        $input  =  new InputValidationHelper();

        $credentials = request(['email', 'password']);
        if ($input->validateUserLogin($credentials)->fails())
            return response()->json(["message" => "Missing Parameters!"], 400);

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Wrong credentials'], 401);
        }
        if (Auth::user()->roles === 'user') {
            return response()->json(["message" => "Unauthorized"], 401);
            $this->logout();
        }

        return $this->respondWithToken($token);
    }


    public function logout()
    {
        Auth::logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh);
    }


    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' =>  3600
        ]);
    }
}
