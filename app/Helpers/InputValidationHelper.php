<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InputValidationHelper
{

    public function validateUserRegistration(Request $request)
    {
        return Validator::make($request->all(), [
            "name" => 'required',
            "email" => 'required|email',
            "password" => 'required',

        ]);
    }

    public function validateUserLogin($request)
    {
        return Validator::make($request, [
            "email" => "required|email",
            "password" => "required"
        ]);
    }
}
