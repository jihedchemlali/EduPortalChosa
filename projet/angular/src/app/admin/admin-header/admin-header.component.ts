import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../../models/User";
import {Notification} from "../../models/Notification";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {TokenStorageService} from "../../services/authentification/token-storage.service";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: [
    '../../../assets/admin/css/all.min.css',
    '../../../assets/admin/css/adminlte.min.css',
    './admin-header.component.css'
  ]
  , encapsulation: ViewEncapsulation.None
})
export class AdminHeaderComponent implements OnInit {

  @Input() user: User = new User();
  @Input() imageUrl: string;

  notifications: Notification[];
  sizeNotifications: number = 0;

  constructor(private loadingBar: LoadingBarService, private router: Router,
              public notificationService: NotificationService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.getUserNotifications();
    this.getSizeNotifications();
  }

  private getUserNotifications() {
    this.notificationService.getUserNotifications(this.user).then((data: any) => {
      this.notifications = data;
    });
  }

  private getSizeNotifications() {
    this.notificationService.getSizeNotifications(this.user, 'NON_LUS').then((data: any) => {
      this.sizeNotifications = data;
    });
  }

  clearNotification(notification: Notification) {
    if (notification.type == 'CONTACT' && notification.status == 'NON_LUS') {
      notification.status = 'LUS';
      this.notificationService.updateNotification(notification).then(() => {
        this.ngOnInit();
      });
    } else if (notification.status == 'LUS') {
      this.router.navigate([notification.url]);
    } else {
      notification.status = 'LUS';
      this.notificationService.updateNotification(notification).then(() => {
        this.ngOnInit();
        this.router.navigate([notification.url]);
      });
    }
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['../']);
  }
}
