import { Injectable } from 'angular2/core';

import {status, json, getUserProfile} from '../utils';

@Injectable()
export class NotificationService {

  getNotifications(limit:number, offset:number, success) {

    var jwt = localStorage.getItem('jwt');
    var username = getUserProfile().username;

    var url = 'http://localhost:3001/private/' + username + '/notifications?';
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

}
