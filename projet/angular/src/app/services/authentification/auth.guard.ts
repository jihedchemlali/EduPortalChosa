import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "./token-storage.service";
import * as jwt_decode from 'jwt-decode';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
              public tokenStorageService: TokenStorageService, private toastr: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.expectedRole;
    const token = this.tokenStorageService.getToken();
    let isRightRole = false;
    if(token){
      const tokenPayload = jwt_decode(token);
      isRightRole = !tokenPayload.roles.includes('ROLE_' + expectedRole);
    }
    if ( !this.authService.isAuthenticated() || isRightRole ) {
      this.toastr.error("You Do NOT Have The PreVilages To C0NTNTINUE !!", "");
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
