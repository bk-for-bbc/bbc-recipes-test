<?php

use Illuminate\Database\Seeder;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (App\User::count() === 0) {
            App\User::create([
                'name' => 'Joe',
                'email' => 'joe@bbc.com',
                'password' => Hash::make('bbc')
            ]);
        }
    }
}
