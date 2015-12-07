import { Injectable } from 'angular2/core';

import {status, json, getUserProfile} from '../utils';
import {Recipe} from '../home/recipe';

@Injectable()
export class RecipesService {

  getRecipes(limit:number, offset:number, success) {

    var jwt = localStorage.getItem('jwt');
    var username = getUserProfile().username;

    var url = 'http://localhost:3001/private/' + username + '/recipes?';
    url += 'limit=' + limit;
    url += '&offset=' + offset;

    window.fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      }
    })
    .then(status)
    .then(json)
    .then(success)
    .catch((error) => {
      alert(error);
      console.log(error);
    });

  }

  getRecipe(id:number, success) {
    
    var jwt = localStorage.getItem('jwt');
    var username = getUserProfile().username;

    var url = 'http://localhost:3001/private/' + username + '/recipes/' + id.toString();

    window.fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      }
    })
    .then(status)
    .then(json)
    .then(success)
    .catch((error) => {
      alert(error);
      console.log(error);
    });

  }

  deleteRecipe(id:number, success) {
    
    var jwt = localStorage.getItem('jwt');
    var username = getUserProfile().username;

    var url = 'http://localhost:3001/private/' + username + '/recipes/' + id.toString();

    window.fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      }
    })
    .then(status)
    .then(json)
    .then(success)
    .catch((error) => {
      alert(error);
      console.log(error);
    });

  }

  getNotes(recipeId:number, success) {

    var jwt = localStorage.getItem('jwt');
    var username = getUserProfile().username;

    var url = 'http://localhost:3001/private/' + username + '/recipes/' + recipeId.toString() + '/notes';

    window.fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      }
    })
    .then(status)
    .then(json)
    .then(success)
    .catch((error) => {
      alert(error);
      console.log(error);
    });

  }

  addNote(recipeId, noteText, success) {

    var jwt = localStorage.getItem('jwt');
    var username = getUserProfile().username;

    var url = 'http://localhost:3001/private/' + username + '/recipes/' + recipeId.toString() + '/notes'

    window.fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      },
      body: JSON.stringify({
        note: noteText
      })
    })
    .then(status)
    .then(json)
    .then(success)
    .catch((error) => {
      alert(error);
      console.log(error);
    });

  }


  addRecipe(recipe: Recipe, success) {

    var jwt = localStorage.getItem('jwt');
    var username = getUserProfile().username;

    window.fetch('http://localhost:3001/private/' + username + '/recipes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      },
      body: JSON.stringify(recipe)
    })
    .then(status)
    .then(json)
    .then(success)
    .catch((error) => {
      alert(error);
      console.log(error);
    });

  }

}
