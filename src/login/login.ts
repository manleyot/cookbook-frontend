import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import { SessionsService } from '../services/SessionsService'

@Component({
  selector: 'login'
})
@View({
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  templateUrl: 'src/login/login.html',
  styleUrls: ['src/login/login.css']
})
export class Login {

  constructor(public router:Router,
              public sessions:SessionsService) {
  }

  login (event, username, password) {
    event.preventDefault();

    this.sessions.newSession(username, password,
      (response: any) => {
        localStorage.setItem('jwt', response.token);
        this.router.navigateByUrl('/home');
      });
  }

}
