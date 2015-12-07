import {Component, View, Input, Output, EventEmitter, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';

import {Recipe} from './recipe';
import {RecipesService} from '../services/RecipesService';

@Component({
  selector: 'recipe-card'
})
@View({
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  templateUrl: 'src/home/recipe-card.html',
  styleUrls: ['src/home/recipe-card.css']
})
export class RecipeCard {

  @Output()
  deleted = new EventEmitter();

  @Input()
  model;

  @Input()
  showDetails: boolean;
  details: Recipe = null;

  showNotes: boolean = false;
  showNotesText: String = "Notes";
  notes: String[] = [];

  addNoteText:String = "Add Note";
  showNewNoteBox:boolean = false;

  public newNoteText = "";

  deleteMode:String = 'prompt';

  constructor(public recipes: RecipesService) {
  }

  detailsIcon = {
    'glyphicon-chevron-down': true,
    'glyphicon-chevron-up': false
  };

  setShowDetails(show: boolean) {
    this.detailsIcon = {
      'glyphicon-chevron-down': !show,
      'glyphicon-chevron-up': show
    };
    this.showDetails = show;
    this.deleteMode = 'prompt';
  }

  detailsClicked() {

    if (this.showDetails) {
      this.setShowDetails(false);
    } else {

      if (this.details == null) {
        // get details from REST service
        //
        this.recipes.getRecipe(this.model.id, (result) => {
          this.details = result;
          this.setShowDetails(true);
        });
      }
      else {
        this.setShowDetails(true);
      }
    }

  }

  setShowNotes(show: boolean) {
    this.showNotesText = show ? "Hide Notes" : "Notes";
    this.showNotes = show;
  }

  showNotesClicked() {
    this.setShowNotes(!this.showNotes);

    if (this.showNotes) {
      this.recipes.getNotes(this.model.id, (result) => {
        this.notes = result;
      });
    }
  }

  setShowNewNoteBox(show: boolean) {
    this.newNoteText = "";
    this.showNewNoteBox = show;
    this.addNoteText = show ? "Cancel" : "Add Note";
  }

  addNoteClicked() {
    this.setShowNewNoteBox(!this.showNewNoteBox);
  }

  addNote(n) {

    if (this.newNoteText == "") {
      return;
    }

    this.recipes.addNote(this.model.id, this.newNoteText, (result) => {
      this.setShowNewNoteBox(false);

      this.recipes.getNotes(this.model.id, (result) => {
        this.notes = result;
      });
    });

  }

  deleteClicked () {
    console.log(this.deleteMode);
    if (this.deleteMode == 'prompt') {
      this.deleteMode = 'execute';
    }
    else {
      this.recipes.deleteRecipe(this.model.id, (result) => {
        this.deleted.next(this.model.id);
      });
    }
  }

}
