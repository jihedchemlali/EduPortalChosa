import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Ecole} from "../models/Ecole";
import {User} from "../models/User";
import {AuthInterceptor} from "../services/authentification/auth-interceptor";
import {TokenStorageService} from "../services/authentification/token-storage.service";
import {EcoleService} from "../services/ecole.service";
import {ScriptLoaderService} from "../services/script-loader.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-ecole',
  templateUrl: './ecole.component.html',
  styleUrls: [
    '../../assets/ecole/css/bootstrap.css',
    '../../assets/ecole/css/styles.css',
    '../../assets/ecole/css/line-awesome/line-awesome.css',
    ],
  encapsulation:ViewEncapsulation.None
})
export class EcoleComponent implements OnInit {

  ecole: Ecole;
  user: User;

  public imageUrl = '../../../assets/ecole/img/photoProfilEcole.png';

  constructor(private ecoleService: EcoleService, private authInterceptor: AuthInterceptor,
              private tokenStorage: TokenStorageService, private userService: UserService,
              private scriptLoader: ScriptLoaderService) {
    this.user = new User();
  }

  ngOnInit() {
    this.user.id = this.tokenStorage.getCurrentUser();
    this.initialiseUser(this.user);
    this.initialisePicture();
    this.getEcole();
    this.loadScripts();
  }

  private loadScripts() {
    this.scriptLoader.loadScript('JquerySlim')
      .then(() => {
        this.scriptLoader.loadScript('Bootstrap');
      })
      .then(() => {
        this.scriptLoader.loadScript('Jquery');
      })
      .then(() => {
        this.scriptLoader.loadScript('espaceScripts');
      })
  }

  private getEcole() {
    this.ecoleService.getUserEcole(this.user.id).then(
      (data: any) => {
        this.ecole = data;
      }
    );
  }

  initialiseUser(user: User) {
    this.userService.getUser(user.id).then((data: any) => {
      this.user = data;
    });
  }

  initialisePicture() {
    let photoId = this.tokenStorage.getUserPicture();
    if (photoId != null) {
      this.imageUrl = this.authInterceptor.BASE_URL + '/files/' + photoId;
    }
  }

  updatePhotoLink() {
    this.initialisePicture();
  }

}
