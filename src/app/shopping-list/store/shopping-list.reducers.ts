import * as ShoppingListActions from './shopping-list.actions';
import Ingredient from '../../shared/ingredient.model';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppState {
    shoppingList: State;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: null
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        }
        case ShoppingListActions.ADD_INGREDIENTS: {
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        }
        case ShoppingListActions.UPDATE_INGREDIENT: {
            const ingredients = [...state.ingredients];
            ingredients[state.editedIngredientIndex] = action.payload;

            return {
                ...state,
                ingredients
            };
        }
        case ShoppingListActions.START_EDIT: {
            const editedIngredient = { ...state.ingredients[action.payload] };

            return {
                ...state,
                editedIngredient,
                editedIngredientIndex: action.payload
            };
        }
        case ShoppingListActions.STOP_EDIT: {
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: null
            };
        }
        case ShoppingListActions.DELETE_INGREDIENT: {
            const ingredients = [...state.ingredients];
            ingredients.splice(state.editedIngredientIndex, 1);

            return {
                ...state,
                ingredients,
                editedIngredient: null,
                editedIngredientIndex: null
            };
        }
        default:
            return state;
    }
}
