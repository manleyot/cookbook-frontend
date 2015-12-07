import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {getUserProfile} from '../utils'
import {Dashboard} from './dashboard'
import {Recipes} from './recipes'

@Component({
  selector: 'home'
})
@View({
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, Dashboard, Recipes],
  templateUrl: 'src/home/home.html',
  styleUrls: ['src/home/home.css']
})
export class Home {

  username: String;

  constructor(public router:Router) {
    this.username = getUserProfile().username;
  }

  signOut() {
    localStorage.removeItem('jwt');
    this.router.parent.navigateByUrl('/login');
  }

  selectedView = 'Dashboard';

}
