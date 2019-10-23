import {Component, Input, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {Ecole} from "../../models/Ecole";
import {Notification} from "../../models/Notification";
import {User} from "../../models/User";
import {TokenStorageService} from "../../services/authentification/token-storage.service";
import {EcoleService} from "../../services/ecole.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-parent-header',
  templateUrl: './parent-header.component.html',
  styleUrls: ['./parent-header.component.css',
    '../../../assets/parent/css/bootstrap.css',
    '../../../assets/parent/css/styles.css',
    '../../../assets/parent/css/line-awesome/line-awesome.css',
    '../../../assets/front/css/toastr.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class ParentHeaderComponent implements OnInit {
  @Input() user: User;
  @Input() imageUrl: string;

  centers: Ecole[];
  searchText: string = '';

  notifications: Notification[];
  sizeNotifications: number = 0;

  constructor(private loadingBar: LoadingBarService, private router: Router, private notificationService: NotificationService,
              private ecoleService: EcoleService, private ngZone: NgZone, private tokenStorage: TokenStorageService) {
    this.user = new User();
  }

  ngOnInit() {
    if (this.user != null) {
      this.getUserNotifications();
      this.getSizeNotifications();
    }
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

  private getSizeNotifications() {
    this.notificationService.getSizeNotifications(this.user, 'NON_LUS').then((data: any) => {
      this.sizeNotifications = data;
    });
  }

  searchEcole() {
    if (this.searchText.length > 2)
      this.ecoleService.searchCenterByName(this.searchText, 0, 0).then(
        (data: any) => {
          this.centers = data;
        }
      );
  }

  clickSearchText() {
    this.ngZone.run(() =>

      this.router.navigate(
        ['/parent/jardins'],
        {
          queryParams:
            {name: this.searchText}
        }
      ))
  }

  test() {

  }

  click() {
    console.log("eeeeee")
  }
}
