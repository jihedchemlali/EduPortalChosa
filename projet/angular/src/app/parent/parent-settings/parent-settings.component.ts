import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../../models/User";
import {TokenStorageService} from "../../services/authentification/token-storage.service";
import {UserService} from "../../services/user.service";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";

declare var FB: any;
declare var $: any;

@Component({
  selector: 'app-parent-settings',
  templateUrl: './parent-settings.component.html',
  styleUrls: ['../../../assets/parent/css/bootstrap.css',
    '../../../assets/parent/css/styles.css',
    '../../../assets/parent/css/line-awesome/line-awesome.css',
    '../../../assets/front/css/toastr.css',
    './parent-settings.component.css'
  ]
})
export class ParentSettingsComponent implements OnInit {

  @ViewChild('button') button: ElementRef;

  user: User;
  facebookUser: User;
  registerForm: FormGroup;
  oldPassword: string = '';
  public imageUrl = '../../../assets/parent/img/photoProfilParent.png';
  private facebookId: string;

  get f() {
    return this.registerForm.controls;
  }

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private tokenStorage: TokenStorageService,
              private userService: UserService,
              private  authInterceptor: AuthInterceptor) {
    this.user = new User();
    this.facebookUser = new User();
  }

  ngOnInit() {
    this.user.id = this.tokenStorage.getCurrentUser();
    this.initialiseUser(this.user);
    this.initialisePicture();
    this.resetForm();

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


  initialiseUser(user: User) {
    this.userService.getUser(user.id).then((data: any) => {
      this.user = data;
    });
  }

  initialisePicture() {
    let photoId = this.tokenStorage.getUserPicture();
    if (photoId != null)
      this.imageUrl = this.authInterceptor.BASE_URL + '/files/' + photoId;
  }

  updatePassword() {
    this.userService.updatePassword(this.user, this.registerForm.value.oldPassword, this.registerForm.value.userPassword).then(
      (data: any) => {
        this.toastr.success("Mot de passe modifié avec succéss");
        this.resetForm();
      })
      .catch(
        (data: any) => {
          this.toastr.error("Erreur est produite");
          this.resetForm();
        }
      );
  }

  backClicked() {
    let roles = this.tokenStorage.getAuthorities();
    if (roles.includes('PARENT')) {
      this.router.navigate(['parent/accueil']);
    } else if (roles.includes('FORMATION')) {
      this.router.navigate(['/ecole/accueil']);
    } else {
      this.router.navigate(['/']);
    }
  }

  resetForm() {
    this.registerForm = this.formBuilder.group({
      id: [],
      oldPassword: ['', Validators.required],
      userPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  apparierCompteFacebook() {
    window['FB'].login((response) => {
      if (response.authResponse) {
        window['FB'].api('/me', {
          fields: 'last_name, first_name, email'
        }, (userInfo) => {
          // let user: User = new User();
          this.facebookId = userInfo.id;
          console.log(this.facebookId);
          this.userService.findUserByFacebookId(userInfo.id).then((data: any) => {
            this.facebookUser = data;
            this.toastr.error("Ce compte est déjà apparié.");
            console.log('then');
            document.getElementById("openModalButton").click();
            console.log('then');
          }).catch((reponse) => {
            console.log('catch');
            this.user.facebook_Id = userInfo.id;
            this.userService.updateUser(this.user).then((data: any) => {
              this.user = data;
              console.log(this.user);
              this.toastr.success("Opération succèss.");
            })
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

  deconnecter() {
    this.user.facebook_Id = null;
    this.userService.updateUser(this.user).then((data: any) => {
      this.user = data;
      console.log(this.user);
      this.toastr.success("Opération succèss.");
    }).catch(error => {
        this.toastr.success("Erreur est produite.");
      }
    )
  }

  associerCompte() {
    if (this.facebookUser != null) {
      this.facebookUser.facebook_Id = null;
      this.userService.updateUser(this.facebookUser).then((data: any) => {
        this.facebookUser = data;
        console.log(this.facebookUser);
        this.user.facebook_Id = this.facebookId;
        this.userService.updateUser(this.user).then(() => {
          this.toastr.success("Opération succèss.")
        });
      }).catch(error => {
          this.toastr.success("Erreur est produite.");
        }
      )
    }
  }
}
