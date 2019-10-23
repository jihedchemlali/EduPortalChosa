import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../models/User";
import {AuthInterceptor} from "../services/authentification/auth-interceptor";
import {TokenStorageService} from "../services/authentification/token-storage.service";
import {UserService} from "../services/user.service";
import {ScriptLoaderService} from "../services/script-loader.service";

declare var $: any;

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['../../assets/parent/css/bootstrap.css',
    '../../assets/parent/css/styles.css',
    '../../assets/parent/css/line-awesome/line-awesome.css'],
  encapsulation:ViewEncapsulation.Emulated

})
export class ParentComponent implements OnInit {
  user: User;
  public imageUrl = '../../../assets/parent/img/photoProfilParent.png';

  constructor(private tokenStorage: TokenStorageService, private userService: UserService, private  authInterceptor: AuthInterceptor, private scriptLoader: ScriptLoaderService) {
    this.user = new User();
  }

  ngOnInit() {
    this.loadScripts();
    this.user.id = this.tokenStorage.getCurrentUser();
    this.initialiseUser(this.user);
    this.initialisePicture();
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

  updatePhotoLink() {
    this.initialisePicture();
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
        this.scriptLoader.loadScript('espaceScripts');
      })
  }
}
