<?php

namespace App\Http\Controllers;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwtAuth', ['except' => ['login','register']]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);
        if ($validator->fails()){
            return response([
                'status' => false,
                'message' => $validator->errors()->first()
            ], 400);
        }
        $user = User::where('email',$validator->validate()['email'])->first();

        if(!$user || !Hash::check($validator->validate()['password'], $user->password)){
            return response([
                'status' => false,
                'message' => 'Incorrect username and/or password'
            ], 400);
        }
        $payload = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email
        ];
        $token = JWT::encode($payload, env('APP_KEY'), 'HS256');
        $user->remember_token = $token;
        $user->save();

        return response([
            'status' => true,
            'token' => $token
        ], 200);

    }

    public function logout(Request $request)
    {
        $token = $request->bearerToken();
        $user = User::where('remember_token', $token)->first();
        $user->remember_token = null;
        $user->save();
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'password_confirmation' => 'required_with:password|same:password|min:6'
        ]);
        if ($validator->fails()){
            return response([
                'status' => false,
                'message' => $validator->errors()->first()
            ], 400);
        }
        $user = User::where('email',  $request->email)->first();
        if ($user) {
            return response([
                'status' => false,
                'message' => 'user with this email address already exists'
            ], 400);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $payload = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email
        ];
        $token = JWT::encode($payload, env('APP_KEY'), 'HS256');
        $user->remember_token = $token;
        $user->save();
        return response([
            'status' => true,
            'token' => $token
        ], 201);
    }
}
