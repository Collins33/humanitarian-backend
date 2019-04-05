<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class AuthController extends Controller
{
    
    /**
     * Register a new user.
     *
     * @return void
    */
    public function register(Request $request)
    {
        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>$request->email
        ]);
        $token = auth()->login($user);
        return $this->respondWithToken($token);
    }

    /**
     *Login a user.
     *
     * @return json with token
    */
    public function login()
    {
        $credentials = request(['email', 'password']);
        if(! $token = auth()->attempt($credentials))
        {
            return response()->json(['error'=>'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message'=>'Successfully logged out']);
    }

    /**
     *Get the authenticated user.
     *
     * @return json 
    */
    public function me()
    {
        return response()->json(auth()->user());
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }
    /**
     *Respond with a token.
     *
     * @return json with token
    */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60
        ]);
    }
}
