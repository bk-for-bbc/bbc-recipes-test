<?php

use Illuminate\Database\Seeder;

class RecipeSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $recipes = [
            [
                'name' => 'Lemon Chicken',
                'cooking_time' => 30,
                'ingredients' => [
                    [4, 'Chicken Breasts'],
                    ['1 tsp', 'Thyme'],
                    [1, 'Lemon']
                ]
            ],
            [
                'name' => 'Beef Stroganoff',
                'cooking_time' => 30,
                'ingredients' => [
                    [1, 'Beef'],
                    [1, 'Mustard'],
                    [1, 'Mushroom']
                ]
            ],
            [
                'name' => 'Caesar Salad',
                'cooking_time' => 25,
                'ingredients' => [
                    [1, 'Lettuce'],
                    [2, 'Croutons'],
                    [1, 'Parmesan']
                ]
            ]
        ];

        foreach ($recipes as $recipe) {
            $model = App\Recipe::create([
                'name' => $recipe['name'],
                'cooking_time' => $recipe['cooking_time']
            ]);

            foreach ($recipe['ingredients'] as $ingredient) {
                $model->ingredients()->create([
                    'quantity' => $ingredient[0],
                    'name' => $ingredient[1]
                ]);
            }
        }
    }
}
