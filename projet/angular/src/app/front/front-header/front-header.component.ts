import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {TokenStorageService} from "../../services/authentification/token-storage.service";
import {ScriptLoaderService} from "../../services/script-loader.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: [
    '../../../assets/front/css/bootstrap.css',
    '../../../assets/front/css/styles.css',
    '../../../assets/front/css/line-awesome/line-awesome.css',
    '../../../assets/front/css/toastr.css',
    './front-header.component.css',]
})
export class FrontHeaderComponent implements OnInit {
  user: User;
  public imageUrl = '../../../assets/parent/img/photoProfilParent.png';
  public test: boolean;

  constructor(public userService: UserService, private authInterceptor: AuthInterceptor, private tokenStorage: TokenStorageService, private router: Router, private scriptLoader: ScriptLoaderService) {
    this.user = new User();
  }

  ngOnInit() {

    this.loadScripts();
    this.verifyToken();
    this.user.id = this.tokenStorage.getCurrentUser();
    this.initialiseUser(this.user);
    this.initialisePicture();

  }

  private verifyToken() {
    this.userService.verifyTokenNotExpired()
      .then(
        data => {
          this.test = true;
        }
      )
      .catch((err: HttpErrorResponse) => {
        this.test = false;

      });
  }

  initialiseUser(user: User) {
    this.userService.getUser(user.id).then((data: any) => {
      this.user = data;
    })
      .catch(err => {
      });

  }

  initialisePicture() {
    let photoId = this.tokenStorage.getUserPicture();
    if (photoId != null)
      this.imageUrl = this.authInterceptor.BASE_URL + '/files/' + photoId;
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

  profil() {
    let roles = this.tokenStorage.getAuthorities();
    if (roles.includes('PARENT')) {
      this.router.navigate(['parent/profil']);
    } else if (roles.includes('FORMATION')) {
      this.router.navigate(['ecole/profil']);
    } else {
      this.router.navigate(['/']);
    }
  }

  surfParametre() {
    let roles = this.tokenStorage.getAuthorities();
    if (roles.includes('PARENT')) {
      this.router.navigate(['parent/parametre']);
    } else if (roles.includes('FORMATION')) {
      this.router.navigate(['ecole/parametre']);
    } else {
      this.router.navigate(['/']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['../login']);
  }

  private loadScripts() {
    this.scriptLoader.loadScript('JquerySlim')
      .then(data => {
        this.scriptLoader.loadScript('Bootstrap');
      })
      .then(data => {
        this.scriptLoader.loadScript('Jquery');
      })
      .then(data => {
        this.scriptLoader.loadScript('Scripts');
      })
  }


}



