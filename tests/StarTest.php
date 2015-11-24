<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class StarTest extends TestCase
{
    use WithoutMiddleware;
    use DatabaseTransactions;

    /**
     * Test starring a recipe.
     *
     * @return void
     */
    public function testCreateStar()
    {
        $this->post('/api/me/starred/1')
            ->seeJson([1]);
        $this->seeInDatabase('recipe_user', ['user_id' => 1, 'recipe_id' => 1]);

        $this->get('/api/me/starred')
            ->seeJson([
                'name' => 'Lemon Chicken'
            ]);
    }

    /**
     * Test unstarring a recipe.
     *
     * @return void
     */
    public function testRemoveStar()
    {
        $this->delete('/api/me/starred/1')
            ->seeJson([]);
        $this->missingFromDatabase('recipe_user', ['user_id' => 1, 'recipe_id' => 1]);

        $this->get('/api/me/starred')
            ->dontSeeJson([
                'name' => 'Lemon Chicken'
            ]);
    }
}
