import {Component, OnInit} from '@angular/core';
import {Notification} from "../../models/Notification";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {TokenStorageService} from "../../services/authentification/token-storage.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-notification-ecole',
  templateUrl: './notification-ecole.component.html',
  styleUrls: ['../../../assets/ecole/css/styles.css',
    '../../../assets/ecole/css/bootstrap.css',
    '../../../assets/ecole/css/line-awesome/line-awesome.css',
    './notification-ecole.component.css']
})
export class NotificationEcoleComponent implements OnInit {

  notifications: Notification[];
  user: User;

  constructor(public notificationService: NotificationService, public userService: UserService, public router: Router, private tokenStorage: TokenStorageService) {
    this.user = new User();
  }

  ngOnInit() {
    this.tokenStorage.getCurrentUser();
    this.userService.getUser(this.tokenStorage.getCurrentUser()).then((data) => {
      this.user = data;
      this.loadNotifications();
      this.initialisePagination();
    });
  }

  private loadNotifications(offset: number = 1) {
    this.notificationService.getUserNotifications(this.user, this.sizePerPage, offset).then(
      (data: any) => {
        this.notifications = data;
        this.currentPage = offset;
      }
    );
  }

  currentPage: number = 1;
  maxSize: any = 0;
  readonly sizePerPage: number = 10;
  lengthPagination: number = 0;

  private initialisePagination() {
    this.notificationService.getSizeNotifications(this.user, null).then(data => {
      this.maxSize = data;
      this.lengthPagination = this.maxSize / this.sizePerPage;
      if (this.lengthPagination > Math.trunc(this.lengthPagination)) this.lengthPagination = Math.trunc(this.lengthPagination) + 1;
    });
  }
}
