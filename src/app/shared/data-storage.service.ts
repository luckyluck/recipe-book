import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';

import { Globals } from './globals';
import { RecipeService } from '../recipes/recipe.service';
import Recipe from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService,
        private globals: Globals
    ) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        const token = this.authService.getToken();

        this.http.put(`${this.globals.BASE_URL}recipes.json?auth=${token}`, recipes)
            .subscribe(
                (response: Response) => {
                    console.log(response);
                }
            );
    }

    getRecipes() {
        const token = this.authService.getToken();

        this.http.get(`${this.globals.BASE_URL}recipes.json?auth=${token}`)
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
