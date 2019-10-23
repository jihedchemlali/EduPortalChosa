import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../models/User";
import {TokenStorageService} from "../services/authentification/token-storage.service";
import {UserService} from "../services/user.service";
import {AuthInterceptor} from "../services/authentification/auth-interceptor";
import {ScriptLoaderService} from "../services/script-loader.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../../assets/admin/css/all.min.css',
    '../../assets/admin/css/adminlte.min.css',
    './admin.component.css']
  , encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit, OnDestroy {

  user: User;
  public imageUrl = '../../../assets/admin/img/defaultUserPicture.png';
  version: string = '1.0.0';

  constructor(private scriptLoader: ScriptLoaderService, private tokenStorage: TokenStorageService, private userService: UserService, private  authInterceptor: AuthInterceptor) {
    this.user = new User();
  }

  ngOnInit() {
    this.loadScripts();
    this.user.id = this.tokenStorage.getCurrentUser();
    this.initialiseUser(this.user);
    this.initialisePicture();
    document.body.classList.forEach(value => {
      document.body.classList.remove(value)
    });
    document.body.classList.add('hold-transition', 'sidebar-mini', 'layout-fixed', 'layout-navbar-fixed', 'layout-footer-fixed');
  }

  ngOnDestroy() {
    document.body.classList.remove('hold-transition', 'sidebar-mini', 'layout-fixed')
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
    this.scriptLoader.loadScript('jQuery-3.4.1')
      .then(() => {
        this.scriptLoader.loadScript('Bootstrap-4.3.1');
      }).then(() => {
      this.scriptLoader.loadScript('overlayScrollbars');
    }).then(() => {
      this.scriptLoader.loadScript('adminlte');
    })
  }

}
