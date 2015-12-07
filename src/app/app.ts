import {View, Component} from 'angular2/angular2';
import {Location, RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Login} from '../login/login';
import {Signup} from '../signup/signup';
import {Home} from '../home/home';

@Component({
  selector: 'cookbook-app'
})
@View({
  templateUrl: 'src/app/app.html',
  directives: [ LoggedInRouterOutlet, ROUTER_DIRECTIVES ]
})
@RouteConfig([
    { path: '/', redirectTo: '/home' },
    { path: '/login',  component: Login,  as: 'Login'  },
    { path: '/signup', component: Signup, as: 'Signup' },
    { path: '/home',   component: Home, as: 'Home' }
])
export class App {

  constructor(public router: Router) {
  }

}
