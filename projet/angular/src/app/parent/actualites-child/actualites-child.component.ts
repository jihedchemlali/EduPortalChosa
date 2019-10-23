import {Component, Input, OnInit} from '@angular/core';
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
  selector: 'app-activities-child',
  templateUrl: './actualites-child.component.html',
  styleUrls: ['../../../assets/parent/css/styles.css',
    '../../../assets/parent/css/bootstrap.css',
    '../../../assets/parent/css/line-awesome/line-awesome.css',
    '../../../assets/parent/css/fontawesome/fontawesome.css'
  ]
})
export class ActualitesChildComponent implements OnInit {
  public pictureChild = '../../../assets/parent/img/imgKid.png';
  childId: number;
  child: Child;
  @Input() user: User;
  parent: User;
  actuality: Actuality;
  actualities: Actuality[];
  selectedActuality: Actuality;
  ecole: Ecole;

  constructor(private tokenStorage: TokenStorageService,
              private ecoleService: EcoleService,
              private router: Router,
              private userService: UserService,
              private authInterceptor: AuthInterceptor,
              private toastr: ToastrService,
              private actualityService: ActualityService,
              private activatedRoute: ActivatedRoute,
              private childService: ChildService) {

    this.child = new Child();
    this.ecole = new Ecole();
    this.actuality = new Actuality();
    this.user = new User();
    this.selectedActuality = new Actuality();
    this.parent = new User();

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(routeParams => {
      this.childId = routeParams.id;
      this.childService.getChildBYId(this.childId).then((data: any) => {
        this.child = data;
        this.setChildPhoto();
        this.getEcole();
      });
      this.user.id = this.tokenStorage.getCurrentUser();
      this.initialiseUser(this.user);
      this.loadActualities();
    });
  }

  initialiseUser(user: User) {
    this.userService.getUser(user.id).then((data: any) => {
      this.user = data;
      this.loadActualities();
    });
  }

  private setChildPhoto() {
    let pictureChild = this.child.picture;
    if (pictureChild != null) {
      this.pictureChild = this.authInterceptor.BASE_URL + '/files/' + pictureChild;
    }
  }

  private getEcole() {
    this.ecoleService.getEcoleById(this.child.center).then(
      (data: any) => {
        this.ecole = data;
      }
    );
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

  parentDeleteActualityChild(actuality: Actuality) {
    this.selectedActuality = actuality;
  }

  deleteChild() {
    this.childService.deleteChild(this.childId).then(data => {
      this.toastr.success("enfant retiré avec succées");
      this.router.navigate(['parent/accueil']);
    });

  }

  removeChildFromEcole() {
    this.ecoleService.deleteChild(this.child.id).then(data => {
      this.toastr.success(this.child.prenom, "enfant retiré avec succées");
      this.router.navigate(['parent/accueil']);
    });
  }

  updateChild(child: Child) {
    this.childService.getChildEcole(this.child.id).then(
      (data: any) => {
        if (data != null) {
          this.child.center = data.id;
        }
        this.childService.updateChild(this.child, this.child.center).then(data => {
            this.toastr.success("Modifié avec succéss");
          }
        );
      });
  }

  updateActuality() {
    this.actualityService.updateActuality(this.selectedActuality).then(data => {
      this.toastr.success("Modification bien enregistré !");
    });
  }


  reset() {
    this.loadActualities()
  }
}
