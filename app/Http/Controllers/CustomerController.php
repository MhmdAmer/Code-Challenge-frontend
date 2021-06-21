<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Expr\Cast\Double;

class CustomerController extends Controller
{
    public function getCustomers(Request $request)
    {
        $field = ['id', 'email', 'name', 'email_verified_at', 'roles', 'created_at'];
        if ($request->query('name') !== null) {
            $data = DB::table('users')->where("name", "=", $request->query('name'))
                ->simplePaginate($request->query('perPage', 15), $field, 'page', $request->query('page', 1));
        }
        if ($request->query('id') !== null) {
            $data = DB::table('users')->where("id", "=", $request->query('id'))
                ->simplePaginate($request->query('perPage', 15), $field, 'page', $request->query('page', 1));
        }
        if ($request->query('email') !== null) {
            $data = DB::table('users')->where("email", "=", $request->query('email'))
                ->simplePaginate($request->query('perPage', 15), $field, 'page', $request->query('page', 1));
        }
        if ($request->query('email') === null && $request->query('name') === null && $request->query('id') === null) {
            $data = DB::table('users')
                ->simplePaginate($request->query('perPage', 15), $field, 'page', $request->query('page', 1));
        }

        return response()->json([
            "data"
            =>    $data,
            "total" =>  DB::table('users')->count()
        ], 201);
    }


    public function getAverageRegistrations(Request $request)
    {
        $type = $request->query('type', 'hours');
        $time = $request->query('time', 24);
        switch ($type) {
            case 'hours':
                $carbon = Carbon::now()->subHours($time);
                break;
            case 'days':
                $carbon = Carbon::now()->subDays($time);
                break;
            case 'weeks':
                $carbon = Carbon::now()->subWeeks($time);
                break;
            case 'months':
                $carbon = Carbon::now()->subMonths($time);
                break;
            case 'years':
                $carbon = Carbon::now()->subYears($time);
                break;

            default:
                return response()->json(["Error" => "Unrecognized Type"], 400);
                break;
        }

        $data = (float)DB::table('users')->where('roles', 'user')->where('created_at', '>', $carbon)->count() / (float)DB::table('users')->count();
        return response()->json(["data" => $data], 201);
    }
}
