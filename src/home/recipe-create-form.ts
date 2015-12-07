import {Component, View, Output, EventEmitter, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

import {Recipe} from './recipe';
import {RecipesService} from '../services/RecipesService';

@Component({
  selector: 'recipe-create-form'
})
@View({
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  templateUrl: 'src/home/recipe-create-form.html',
  styleUrls: ['src/home/recipe-create-form.css']
})
export class RecipeCreateForm {

  @Output()
  created = new EventEmitter();

  @Output()
  canceled = new EventEmitter();

  recipe: Recipe = new Recipe(
              "New Recipe",
              "description...",
              [],
              []);

  constructor(public recipes: RecipesService) {
  }

  addIngredient(evt) {
    let ingName = evt.target.previousElementSibling.value;
    evt.target.previousElementSibling.value = "";

    if (ingName.length == 0) {
      return;
    }

    // check if its already in list
    //
    let ingIdx = this.recipe.ingredients.indexOf(ingName);

    if (ingIdx > -1) {
      console.log("ingredient already in list");
      return;
    }

    this.recipe.ingredients.push(ingName);
  }

  removeIngredient(evt, ingredient) {

    let ingName = ingredient.innerHTML;

    let ingIdx = this.recipe.ingredients.indexOf(ingName);

    if (ingIdx > -1) {
      this.recipe.ingredients.splice(ingIdx, 1);
    }
  }

  addDirection(evt) {
    let directionText = evt.target.previousElementSibling.value;
    evt.target.previousElementSibling.value = "";

    if (directionText.length == 0) {
      return;
    }

    this.recipe.steps.push(directionText);
  }

  removeDirection(evt, direction) {

    let dirText = direction.innerHTML;

    let dirIdx = this.recipe.steps.indexOf(dirText);

    if (dirIdx > -1) {
      this.recipe.steps.splice(dirIdx, 1);
    }
  }

  onCancelClicked(evt) {
    this.canceled.next(evt);
  }

  onSubmitClicked(evt) {
    evt.preventDefault();

    this.recipes.addRecipe(this.recipe,
      (result) => {
        this.created.next(this.recipe);
      });
  }

}
