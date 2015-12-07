import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import { UsersService } from '../services/UsersService'

@Component({
  selector: 'signup'
})
@View({
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  templateUrl: 'src/signup/signup.html',
  styleUrls: ['src/signup/signup.css']
})
export class Signup {

  constructor(public router:Router,
              public users:UsersService) {
  }

  signup(event, username, password) {
    event.preventDefault();

    this.users.newUser(username, password,
      (response: any) => {
        localStorage.setItem('jwt', response.token);
        this.router.navigateByUrl('/home');
      });
  }

  login(event) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/login');
  }

}
