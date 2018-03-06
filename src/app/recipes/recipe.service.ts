import { Injectable } from '@angular/core';

import Recipe from './recipe.model';
import Ingredient from '../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            1,
            'A Test Recipe',
            'This is simply a test number one',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]
        ),
        new Recipe(
            2,
            'Another Test Recipe',
            'This is simply a test number two',
            'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ]
        )
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
        return this.recipes.find(recipe => recipe.id === id);
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        // TODO generate ID in another way
        const newRecipe = Object.assign({}, recipe, { id: this.recipes.length + 1 });

        this.recipes.push(newRecipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(newRecipe: Recipe) {
        this.recipes.forEach((recipe, index) => {
            if (recipe.id === newRecipe.id) {
                this.recipes[index] = newRecipe;
            }
        })
        // this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }
}
