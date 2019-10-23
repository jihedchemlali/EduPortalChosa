import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Actuality} from "../../models/Actuality";
import {Child} from "../../models/Child";
import {Ecole} from "../../models/Ecole";
import {User} from "../../models/User";
import {ActualityService} from "../../services/actuality.service";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {ChildService} from "../../services/child.service";
import {EcoleService} from "../../services/ecole.service";
import {TokenStorageService} from "../../services/authentification/token-storage.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-actualities-enfant',
  templateUrl: './actualities-enfant.component.html',
  styleUrls: [
    '../../../assets/ecole/css/bootstrap.css',
    '../../../assets/ecole/css/styles.css',
    '../../../assets/ecole/css/line-awesome/line-awesome.css',
    '../ecole.component.css',]
})
export class ActualitiesEnfantComponent implements OnInit {
  public pictureChild = '../../../assets/ecole/img/imgKid.png';
  ecole: Ecole;
  child: Child;
  userId: number;
  actualities: Actuality[];
  @Input() user: User;
  parent: User;
  childId: number;
  selectedActuality: Actuality;
  actuality: Actuality;
  @Output() membre = new EventEmitter();

  constructor(private ecoleService: EcoleService,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService,
              private actualityService: ActualityService,
              private activatedRoute: ActivatedRoute,
              private childService: ChildService,
              private authInterceptor: AuthInterceptor,
              private tokenStorage: TokenStorageService) {
    this.child = new Child();
    this.actualities = new Array();
    this.user = new User();
    this.parent = new User();
    this.selectedActuality = new Actuality();

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(routeParams => {
      this.childId = routeParams.id;
      this.childService.getChildBYId(this.childId).then((data: any) => {

        this.child = data;
        this.setChildPhoto();
      });
      this.user.id = this.tokenStorage.getCurrentUser();
      this.initialiseUser(this.user);

      this.loadActualities();
    });
  }

  private setChildPhoto() {
    let pictureChild = this.child.picture;
    if (pictureChild != null) {
      this.pictureChild = this.authInterceptor.BASE_URL + '/files/' + pictureChild;
    }
  }

  initialiseUser(user: User) {
    this.userService.getUser(user.id).then((data: any) => {
      this.user = data;
      this.loadActualities();
    });
  }

  public loadActualities() {
    this.actualityService.getActualityChild(this.childId).then((data: any) => {
      this.actualities = data;

    }).then(() => {
      for (var actuality of this.actualities) {
        if (actuality.user != this.user.id) {
          this.userService.getUser(actuality.user).then((data: any) => {
            this.parent = data;
          }).then(() => {
            }
          );
          break;
        }
      }
    });
  }


  deleteActualite(actuality: Actuality) {
    this.actualityService.deleteActuality(actuality.id).then(data => {
      this.toastr.success("actualité retiré avec succées", "");
      this.actualityService.getActualityChild(this.child.id).then(
        (data: any) => {
          this.actualities = data;

        });
    });

  }

  parentDeleteChildActualities(actuality: Actuality) {
    this.selectedActuality = actuality;
  }

  updateActuality() {
    this.actualityService.updateActuality(this.selectedActuality).then(data => {
      this.toastr.success("Modification bien enregistré !");
    }).catch(err => {
      this.toastr.success("Erreur", "une problème est survenu !");
    });

  }

  reset() {
    this.loadActualities();
  }

  removeChildFromEcole() {
    this.ecoleService.deleteChild(this.child.id).then(data => {
      this.toastr.success(this.child.prenom, "enfant retiré avec succées");
      this.router.navigate(['ecole/accueil']);
    });
  }

  deleteChild() {
    this.childService.deleteChild(this.childId).then(data => {
      this.toastr.success("enfant retiré avec succées");
      this.router.navigate(['ecole/accueil']);
    });

  }


}
