import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';

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