import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/angular2';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {Login} from '../login/login';

@Directive({
  selector: 'loggedin-router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(elemRef: ElementRef,
              loader: DynamicComponentLoader,
              parentRouter: Router,
              @Attribute('name') nameAttr: string) {
    super (elemRef, loader, parentRouter, nameAttr);

    this.parentRouter = parentRouter;
    this.publicRoutes = {
      '/login': true,
      '/signup': true
    };
  }

  activate(instruction: ComponentInstruction) {
    var url = this.parentRouter.lastNavigationAttempt;
    if (!this.publicRoutes[url] && !localStorage.getItem('jwt')) {
      this.parentRouter.navigateByUrl('/login');
    }
    return super.activate(instruction);
  }
}
