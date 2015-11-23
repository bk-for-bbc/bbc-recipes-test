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
                'image' => '/images/recipes/lemon_chicken.png',
                'ingredients' => [
                    [4, 'Chicken Breasts'],
                    ['1 tsp', 'Thyme'],
                    [1, 'Lemon']
                ]
            ],
            [
                'name' => 'Beef Stroganoff',
                'cooking_time' => 30,
                'image' => '/images/recipes/beef_stroganoff.png',
                'ingredients' => [
                    [1, 'Beef'],
                    [1, 'Mustard'],
                    [1, 'Mushroom']
                ]
            ],
            [
                'name' => 'Caesar Salad',
                'cooking_time' => 25,
                'image' => '/images/recipes/caesar_salad.png',
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
                'cooking_time' => $recipe['cooking_time'],
                'image' => $recipe['image']
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
