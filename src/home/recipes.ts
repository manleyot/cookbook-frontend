import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';

import {Recipe} from './recipe';
import {Pageable} from './pageable';
import {RecipesService} from '../services/RecipesService';
import {RecipeCard} from './recipe-card';
import {RecipeCreateForm} from './recipe-create-form';

@Component({
  selector: 'recipes'
})
@View({
  directives: [CORE_DIRECTIVES, RecipeCard, RecipeCreateForm],
  templateUrl: 'src/home/recipes.html',
  styleUrls: ['src/home/recipes.css']
})
export class Recipes extends Pageable {

  recipeList:any[] = [];
  
  newRecipeBtnEvent: any = null;
  showNewRecipeForm: boolean = false;

  constructor(public recipes: RecipesService) {
    super();
    this.updateRecipeList();
  }

  updateRecipeList() {
    this.recipes.getRecipes (
      this.pageSize, this.currentPage * this.pageSize,
      (result) => {
        this.recipeList = result.recipes;
        this.enableNext = result.more;
        this.enablePrev = this.currentPage != 0;
      });
  }

  onPreviousPage() {
    this.updateRecipeList ();
  }

  onNextPage() {
    this.updateRecipeList ();
  }

  onNewRecipe(evt) {

    console.log(evt.target.className);

    if (this.newRecipeBtnEvent != null) {
      return false;
    }

    let btn = evt.target;
    let oldBtnClass = btn.className;
    evt.target.className += " click-anm";
    let comp = this;

    this.newRecipeBtnEvent = setTimeout(function() {
      btn.className = oldBtnClass;
      comp.newRecipeBtnEvent = null;
    },
    1000);

    this.showNewRecipeForm = true;
  }

  onRecipeCreated(recipe) {
    this.updateRecipeList(); 
    this.showNewRecipeForm = false;
  }

}
