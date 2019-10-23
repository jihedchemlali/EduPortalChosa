import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const AUTHORITIES_KEY = 'AuthAuthorities';
const PICTURE_KEY = 'Picture';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.localStorage.removeItem(AUTHORITIES_KEY);
    window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (localStorage.getItem(TOKEN_KEY)) {
      JSON.parse(localStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.substring(5, authority.length));
      });
    }
    return this.roles;
  }

  public getCurrentUser() {
    if(!this.getToken())
      return null;
    let jwt = this.getToken();
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData.id;
  }

  public getUserPicture(): string {
    return localStorage.getItem(PICTURE_KEY);
  }

  public saveUserPicture(photo: string) {
    window.localStorage.removeItem(PICTURE_KEY);
    window.localStorage.setItem(PICTURE_KEY, photo);
  }

}
