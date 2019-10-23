import {Component, Input, OnInit} from '@angular/core';
import {LoadingBarService} from "@ngx-loading-bar/core";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {Notification} from "../../models/Notification";
import {NotificationService} from "../../services/notification.service";
import {TokenStorageService} from "../../services/authentification/token-storage.service";

@Component({
  selector: 'app-ecole-header',
  templateUrl: './ecole-header.component.html',
  styleUrls: [
    '../../../assets/front/css/bootstrap.css',
    '../../../assets/ecole/css/styles.css',
    '../../../assets/front/css/line-awesome/line-awesome.css',
    '../../../assets/front/css/toastr.css',
    './ecole-header.component.css',]
})
export class EcoleHeaderComponent implements OnInit {

  @Input() user: User;
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

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['../']);
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
    if (notification.status == 'LUS') {
      this.router.navigate([notification.url]);
    } else {
      notification.status = 'LUS';
      this.notificationService.updateNotification(notification).then(() => {
        this.ngOnInit();
        this.router.navigate([notification.url]);
      });
    }
  }
}
