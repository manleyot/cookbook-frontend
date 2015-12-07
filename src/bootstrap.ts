import { bootstrap, FORM_PROVIDERS, bind } from 'angular2/angular2';
import { ROUTER_PROVIDERS, APP_BASE_HREF } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import { App } from './app/app';
import { UsersService } from './services/UsersService';
import { SessionsService } from './services/SessionsService';
import { RecipesService } from './services/RecipesService';
import { NotificationService } from './services/NotificationService';

bootstrap(
  App,
  [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    bind(APP_BASE_HREF).toValue('/'),
    UsersService,
    SessionsService,
    RecipesService,
    NotificationService
  ]
);
