import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {EcoleService} from "../../services/ecole.service";
import {User} from "../../models/User";
import {ScriptLoaderService} from "../../services/script-loader.service";

@Component({
  selector: 'app-admin-accueil',
  templateUrl: './admin-accueil.component.html',
  styleUrls: [
    '../../../assets/admin/css/all.min.css',
    '../../../assets/admin/css/adminlte.min.css',
    './admin-accueil.component.css'
  ]
  , encapsulation: ViewEncapsulation.None
})
export class AdminAccueilComponent implements OnInit {

  users: User[];
  selectedUser: User;
  defaultUserPicture: string = '../../../assets/admin/img/defaultUserPicture.png';

  constructor(private userService: UserService, private ecoleService: EcoleService, protected authInterceptor: AuthInterceptor, private scriptLoader: ScriptLoaderService) {
  }

  ngOnInit() {
    // this.loadScripts();
    this.loadUsers();
    this.selectedUser = new User();
    this.initialisePagination();
  }

  private loadUsers(offset: number = 1) {
    this.userService.getUsersByRole('FORMATION', this.sizePerPage, offset).then(
      (data: any) => {
        this.users = data;
        this.currentPage = offset;
      }
    );
  }

  updateSelectedUser(user: User) {
    this.selectedUser = user;
  }

  updateCenterStatus(status: string) {
    this.selectedUser.status = status;
    this.ecoleService.updateCenterStatus(this.selectedUser).then(data => {
        this.selectedUser = data;
      }
    )
  }

  currentPage: number = 1;
  maxSize: any = 0;
  readonly sizePerPage: number = 5;
  lengthPagination: number = 0;

  private initialisePagination() {
    this.userService.getSizeOfUsers('FORMATION', null).then(data => {
      this.maxSize = data;
      this.lengthPagination = this.maxSize / this.sizePerPage;
      if (this.lengthPagination > Math.trunc(this.lengthPagination)) this.lengthPagination = Math.trunc(this.lengthPagination) + 1;
    });
  }

  private loadScripts() {
    this.scriptLoader.loadScript('jQuery-3.4.1')
      .then(data => {
        this.scriptLoader.loadScript('overlayScrollbars');
      }).then(data => {
      this.scriptLoader.loadScript('adminlte');
    })
  }
}
