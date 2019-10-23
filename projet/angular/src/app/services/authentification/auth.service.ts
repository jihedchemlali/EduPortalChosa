import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public jwtHelper: JwtHelperService;

  constructor(public tokenStorage: TokenStorageService) {
    this.jwtHelper = new JwtHelperService();
  }

  public isAuthenticated(): boolean {
    const token = this.tokenStorage.getToken();
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

}
