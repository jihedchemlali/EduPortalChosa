import {Injectable} from '@angular/core';
import {User} from "../models/User";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./authentification/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public USERS_URL = `/users`;
  public Contact_Admin = '/users/contact';
  public AUTH_USER = `/authenticate/signin`;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  postUser(user: any): Observable<any> {
    return this.http.post(this.USERS_URL, user);
  }

  updateUser(user: User) {
    return this.http.patch('/users/' + user.id, user).toPromise();
  }

  findUserByFacebookId(facebookId: string) {
    let params = new HttpParams();
    params = params.append('facebookId', facebookId);
    return this.http.get('/users/facebook', {params}).toPromise();
  }

  contactAdmin(name: any, email: any, message: any) {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('name', name);
    params = params.append('message', message);

    return this.http.post('/users/contact', null, {params: params}).toPromise();
  }

  loginUser(user: any) {
    return this.http.post<any>(this.AUTH_USER, user).toPromise();
  }

  loginUserViaFb(user: any) {
    return this.http.post<any>(this.AUTH_USER, user).toPromise();
  }


  validateAccount(apiUrl: string) {
    return this.http.put(this.USERS_URL + apiUrl, null);
  }

  sendResetEmail(email: string) {
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.post<any>('/users/reset-password', null, {
      params: params
    }).toPromise();
  }

  verifyToken(user: User, token: string) {
    let params = new HttpParams();
    params = params.append('token', token);
    return this.http.post<any>("/users/verify-token", user, {params}).toPromise();
  }

  verifyTokenNotExpired() {
    return this.http.get<any>("/users/verifyTokenNotExpired").toPromise();
  }

  resetPassword(user: User) {
    return this.http.patch('/users/' + user.id + '/reset-password', user).toPromise();
  }

  getUser(userId: any) {
    return this.http.get<any>('/users/' + userId).toPromise();
  }

  getUsersByRole(role: string, size: any = 5, offset: any = 1) {
    let params = new HttpParams();
    params = params.append('role', role);
    params = params.append('size', size);
    params = params.append('offset', offset);
    return this.http.get<any>('/users', {params: params}).toPromise();
  }

  getSizeOfUsers(role: string, status: string) {
    let params = new HttpParams();
    params = params.append('role', role);
    if (status != null)
      params = params.append('status', status);
    return this.http.get<any>('/users/maxSize', {params: params}).toPromise();
  }

  updatePassword(user: User, oldPassword: string, newPassword: string) {
    user.userPassword = newPassword;
    console.log(JSON.stringify(user));
    let params = new HttpParams();
    params = params.append('oldPassword', oldPassword);
    return this.http.patch<any>("/users/" + user.id + "/update-password", user, {params}).toPromise();
  }
}
