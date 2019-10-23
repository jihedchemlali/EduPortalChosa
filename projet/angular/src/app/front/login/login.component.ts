import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/authentification/token-storage.service";
import {ToastrService} from "ngx-toastr";

declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
    '../../../assets/front/css/bootstrap.css',
    '../../../assets/front/css/styles.css',
    '../../../assets/front/css/line-awesome/line-awesome.css',
    '../../../assets/front/css/toastr.css'
  ]
})
export class LoginComponent implements OnInit {

  public user: User;

  constructor(public userService: UserService, private router: Router, private tokenStorage: TokenStorageService, private toastr: ToastrService) {
    this.user = new User();
  }

  ngOnInit() {

    this.fbLibrary();

    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '478960336184433',
        cookie: true,
        redirectUri: window.location.origin + '/parent/accueil',
        requiredUrlParams: ['display', 'scope'],
        scope: ['email'],
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


  }

  loginUser() {
    this.tokenStorage.signOut();

    this.userService.loginUser(this.user).then((response: any) => {
        this.tokenStorage.saveToken(response.token);
        let jwt = response.token;
        let jwtData = jwt.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        if (response.picture)
          this.tokenStorage.saveUserPicture(response.picture);
        this.tokenStorage.saveAuthorities(decodedJwtData.roles);
        let roles = this.tokenStorage.getAuthorities();
        if (roles.includes('PARENT')) {
          this.router.navigate(['parent/accueil']);
        } else if (roles.includes('FORMATION')) {
          this.router.navigate(['/ecole/accueil']);
        } else if (roles.includes('ADMIN')) {
          window.open('/admin/accueil', "_blank");
          this.user = new User();
          // this.router.navigate(['/admin/accueil']);
        } else {
          this.toastr.error("Données erronées !");
        }
      }
    ).catch((response: any) => {
      this.toastr.error("Invalid credentials");
    });
  }

  submitLogin() {
    window['FB'].login((response) => {
      if (response.authResponse) {
        window['FB'].api('/me', {
          fields: 'last_name, first_name, email'
        }, (userInfo) => {
          let user: User = new User();
          this.userService.findUserByFacebookId(userInfo.id).then((data: any) => {
            user = data;
            user.facebook_Id = response.id;
            this.userService.loginUser(user).then((response) => {
              this.tokenStorage.saveToken(response.token);
              let jwt = response.token;
              let jwtData = jwt.split('.')[1];
              let decodedJwtJsonData = window.atob(jwtData);
              let decodedJwtData = JSON.parse(decodedJwtJsonData);
              if (response.picture)
                this.tokenStorage.saveUserPicture(response.picture);
              this.tokenStorage.saveAuthorities(decodedJwtData.roles);
              let roles = this.tokenStorage.getAuthorities();
              if (roles.includes('PARENT')) {
                // this.router.navigate(['parent/accueil']);
                window.open('/parent/accueil', "_blank");
                this.user = new User();
              } else if (roles.includes('FORMATION')) {
                // this.router.navigate(['/ecole/accueil']);
                window.open('/ecole/accueil', "_blank");
                this.user = new User();
              } else if (roles.includes('ADMIN')) {
                window.open('/admin/accueil', "_blank");
                this.user = new User();
              } else {
                this.toastr.error("Données erronées !");
                this.router.navigate(['/']);
              }
            });
          }).catch((reponse) => {
            console.log('catch');
            this.toastr.success("Aucun compte pour ce Facebook.");
          });


        });

      } else {
        console.log('User login failed');
      }
    }, {scope: 'email'});

  }

  fbLibrary() {

    (window as any).fbAsyncInit = function () {
      window['FB'].init({
        appId: '869805000070130',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      window['FB'].AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

}
