import {DatePipe} from "@angular/common";
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../../models/User";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {TokenStorageService} from "../../services/authentification/token-storage.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-parent-profil',
  templateUrl: './parent-profil.component.html',
  styleUrls: [
    '../../../assets/parent/css/bootstrap.css',
    '../../../assets/parent/css/styles.css',
    '../../../assets/parent/css/line-awesome/line-awesome.css',
    '../../../assets/front/css/toastr.css',
    './parent-profil.component.css',],


  providers: [DatePipe],
  encapsulation:ViewEncapsulation.Emulated,

})
export class ParentProfilComponent implements OnInit {

  public dateFormat: string = 'yyyy-MM-dd';
  userId: number;
  public user: User;
  public imageUrl = '../../../assets/parent/img/photoProfilParent.png';

  constructor(private router: Router,
              private datePipe: DatePipe,
              private toastr: ToastrService,
              private  authInterceptor: AuthInterceptor,
              private activatedRoute: ActivatedRoute,
              private tokenStorage: TokenStorageService,
              private userService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.user.id = this.tokenStorage.getCurrentUser();
    this.initialiseUser(this.user);
    this.initialisePicture();

  }

  initialiseUser(user: User) {
    this.userService.getUser(user.id).then((data: any) => {
      this.user = data;
      this.user.birth_date = this.datePipe.transform(decodeURIComponent(data.birth_date), this.dateFormat);
    });
  }
  initialisePicture() {
    let photoId = this.tokenStorage.getUserPicture();
    if (photoId != null)
      this.imageUrl = this.authInterceptor.BASE_URL + '/files/' + photoId;
  }

  updateUser() {
    this.userService.updateUser(this.user).then((data: any) => {
      this.user = data;
      this.toastr.success("Modifié avec succéss");
      this.initialiseUser(this.user)

    }).catch(
      (data: any) => {
        this.toastr.error("Erreur est produite");
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
}
