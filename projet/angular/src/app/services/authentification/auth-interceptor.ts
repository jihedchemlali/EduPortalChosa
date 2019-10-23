import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {TokenStorageService} from './token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // public BASE_URL = 'http://localhost:8080/api';
   //public BASE_URL = 'https://chosa-api.allence-tunisie.com/api';
    public BASE_URL = 'http://localhost:83/api';


  constructor(private tokenStorage: TokenStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let authReq = req;
    const token = this.tokenStorage.getToken();
    if (token != null
    // && !authReq.url.includes("authenticate")
    ) {
      authReq = req.clone({
        url: this.BASE_URL + req.url,
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
      });
    } else {
      authReq = req.clone({url: this.BASE_URL + req.url});
    }
    return next.handle(authReq);
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
