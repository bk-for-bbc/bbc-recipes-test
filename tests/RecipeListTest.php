<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RecipeListTest extends TestCase
{
    /**
    * Test the browse list of recipes.
    *
    * @return void
    */
    public function testBrowseList()
    {
        $this->get('/api/recipes')
            ->seeJson([
                'name' => 'Lemon Chicken',
                'cooking_time' => 30
            ]);
    }

    /**
    * Test the browse list of recipes.
    *
    * @return void
    */
    public function testSingleRecipe()
    {
        $this->get('/api/recipes/lemon-chicken')
            ->seeJson([
                'name' => 'Lemon Chicken',
                'cooking_time' => 30
            ]);
    }
}
