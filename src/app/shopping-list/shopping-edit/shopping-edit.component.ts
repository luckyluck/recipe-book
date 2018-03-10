import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import Ingredient from '../../shared/ingredient.model';
import { AddIngredient, UpdateIngredient, DeleteIngredient, StopEdit } from '../store/shopping-list.actions';
import { AppState } from '../store/shopping-list.reducers';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f') slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItem: Ingredient;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.subscription = this.store.select('shoppingList')
            .subscribe(
                data => {
                    if (data.editedIngredientIndex !== null) {
                        this.editMode = true;
                        this.editedItem = data.editedIngredient;
                        this.slForm.setValue({
                            name: this.editedItem.name,
                            amount: this.editedItem.amount
                        });
                    }
                }
            );
    }

    ngOnDestroy() {
        this.store.dispatch(new StopEdit());
        this.subscription.unsubscribe();
    }

    onSubmit(form: NgForm) {
        const ingredient = new Ingredient(form.value.name, form.value.amount);

        if (this.editMode) {
            this.store.dispatch(
                new UpdateIngredient(ingredient)
            );
        } else {
            this.store.dispatch(
                new AddIngredient(ingredient)
            );
        }

        this.editMode = false;
        form.reset();
    }

    onClear() {
        this.slForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.onClear();
        this.store.dispatch(
            new DeleteIngredient()
        );
    }
}
