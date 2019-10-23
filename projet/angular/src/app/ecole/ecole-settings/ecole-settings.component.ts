import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../../models/User";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {TokenStorageService} from "../../services/authentification/token-storage.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-ecole-settings',
  templateUrl: './ecole-settings.component.html',
  styleUrls: [
    '../../../assets/ecole/css/bootstrap.css',
    '../../../assets/ecole/css/styles.css',
    '../../../assets/ecole/css/line-awesome/line-awesome.css',
    '../../../assets/front/css/toastr.css',
    './ecole-settings.component.css',
  ]
})
export class EcoleSettingsComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  oldPassword: string = '';
  public imageUrl = '../../../assets/parent/img/photoProfilParent.png';

  get f() {
    return this.registerForm.controls;
  }

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private  authInterceptor: AuthInterceptor,
              private tokenStorage: TokenStorageService,
              private userService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.user.id = this.tokenStorage.getCurrentUser();
    this.initialiseUser(this.user);
    this.initialisePicture();
    this.resetForm();
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
    let userPassword = this.user.userPassword;
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
      )
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

}
