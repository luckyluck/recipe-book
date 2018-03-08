import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';

import { Globals } from './globals';
import { RecipeService } from '../recipes/recipe.service';
import Recipe from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private globals: Globals) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put(`${this.globals.BASE_URL}recipes.json`, recipes)
            .subscribe(
                (response: Response) => {
                    console.log(response);
                }
            );
    }

    getRecipes() {
        this.http.get(`${this.globals.BASE_URL}recipes.json`)
            .subscribe(
                (response: Recipe[]) => {
                    const recipes = response.map(recipe => {
                        if (!recipe.ingredients) {
                            recipe.ingredients = [];
                        }

                        return recipe;
                    });
                    this.recipeService.setRecipes(response);
                }
            );
    }

}
