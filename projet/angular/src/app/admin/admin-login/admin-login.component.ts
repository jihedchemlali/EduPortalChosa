import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/authentification/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../models/User";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['../../../assets/admin/css/all.min.css',
    '../../../assets/admin/css/icheck-bootstrap.min.css',
    '../../../assets/admin/css/adminlte.min.css',
    '../../../assets/admin/webfonts/googlepis-fonts.css',
    './admin-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLoginComponent implements OnInit {

  public user: User;

  constructor(public userService: UserService, private router: Router, private tokenStorage: TokenStorageService, private toastr: ToastrService) {
    this.user = new User();
  }

  ngOnInit() {
    document.body.classList.forEach(value => {
      document.body.classList.remove(value)
    });
    document.body.classList.add('hold-transition', 'login-page');
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
        if (roles.includes('ADMIN')) {
          this.router.navigate(['admin/accueil']);
        } else {
          this.toastr.error("Données erronées !");
          this.router.navigate(['/']);
        }
      }
    ).catch((response: any) => {
      this.toastr.error("Invalid credentials");
    });
  }
}
