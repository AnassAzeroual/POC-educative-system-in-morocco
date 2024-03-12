import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const redirectUrl = route['_routerState']['url'];

    if (this.localStorageService.isLogged()) {
      return true;
    }

    this.router.navigateByUrl('/');

    return false;
  }
}