import { Injectable } from 'angular2/core';

import {status, json} from '../utils';

@Injectable()
export class UsersService {

  newUser (username: String, password: String, success) {

    window.fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, password
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
}
