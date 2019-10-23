import {DatePipe} from "@angular/common";
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Ecole} from "../../models/Ecole";
import {User} from "../../models/User";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {EcoleService} from "../../services/ecole.service";
import {TokenStorageService} from "../../services/authentification/token-storage.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-ecole-profil',
  templateUrl: './ecole-profil.component.html',
  styleUrls: [
    '../../../assets/ecole/css/styles.css',
    '../../../assets/ecole/css/bootstrap.css',
    '../../../assets/ecole/css/line-awesome/line-awesome.css',
    '../../../assets/front/css/toastr.css',
    './ecole-profil.component.css',
  ],
  providers: [DatePipe]

})
export class EcoleProfilComponent implements OnInit {

  public user: User;
  public ecole: Ecole;
  public dateFormat: string = 'yyyy-MM-dd';
  userId: number;
  public imageUrl = '../../../assets/parent/img/photoProfilParent.png';

  constructor(private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe,
              private router: Router,
              private  authInterceptor: AuthInterceptor,
              private userService: UserService,
              private  ecoleService: EcoleService,
              private toastr: ToastrService,
              private tokenStorage: TokenStorageService) {
    this.user = new User();
    this.ecole = new Ecole();

  }

  ngOnInit() {
   // this.userId = this.activatedRoute.snapshot.params['id'];
    this.user.id = this.tokenStorage.getCurrentUser();
    this.initialiseUser(this.user);
    this.initialisePicture();
    this.getEcole();

  }

  initialiseUser(user: User) {
    this.userService.getUser(user.id).then((data: any) => {
      this.user = data;
      this.user.birth_date = this.datePipe.transform(decodeURIComponent(data.birth_date), this.dateFormat);

    });
  }

  updateUser() {
    this.userService.updateUser(this.user).then((data: any) => {
      this.user = data;
      this.toastr.success("Modifié avec succéss");
      this.initialiseUser(this.user);

      this.ecoleService.updateCenterInformations(this.ecole).then((data: any) => {
          this.ecole = data;
          this.ecole.foundationDay = this.datePipe.transform(decodeURIComponent(data.foundationDay), this.dateFormat);

        }
      );
    });
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


  initialisePicture() {
    let photoId = this.tokenStorage.getUserPicture();
    if (photoId != null)
      this.imageUrl = this.authInterceptor.BASE_URL + '/files/' + photoId;
  }

  private getEcole() {
    this.ecoleService.getUserEcole(this.user.id).then(
      (data: any) => {
        this.ecole = data;
        this.ecole.foundationDay = this.datePipe.transform(decodeURIComponent(data.foundationDay), this.dateFormat);

      }
    );
  }
}
