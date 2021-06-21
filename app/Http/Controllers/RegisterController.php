<?php


namespace App\Http\Controllers\API;


namespace App\Http\Controllers;

use App\Helpers\InputValidationHelper;
use App\Models\User;
use Illuminate\Http\Request;


class RegisterController extends Controller
{

    public function register(Request $request)
    {
        $inputData = new InputValidationHelper();

        if ($inputData->validateUserRegistration($request)->fails())
            return response()->json(['error' => 'Missing parameters!.'], 404);

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);

        // try {
        $user = User::create($input);
        $user->sendEmailVerificationNotification();
        // } catch (\Throwable $th) {
        //     return response()->json([
        //         "message" => "Something went Wrong"
        //     ], 401);
        // }






        return response()->json([
            "data" => "success"
        ], 201);
    }
}
