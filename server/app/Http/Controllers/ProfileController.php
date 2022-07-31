<?php

namespace App\Http\Controllers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwtAuth');
    }
    public function profile(Request $request){
        $key = env('APP_KEY');
        $data = JWT::decode($request->bearerToken(), new Key($key, 'HS256'));
        return response([
            'id' => $data->id,
            'name' => $data->name,
            'email' => $data->email,
            'example' => [
                'result' => 9,
                'max' => 10
            ]
        ], 200);

    }
}
