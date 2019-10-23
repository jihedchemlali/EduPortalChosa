import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {TokenStorageService} from "../../services/authentification/token-storage.service";

@Component({
  selector: 'app-parent-footer',
  templateUrl: './parent-footer.component.html',
  styleUrls: [
    '../../../assets/parent/css/bootstrap.css',
    '../../../assets/parent/css/styles.css',
    '../../../assets/parent/css/line-awesome/line-awesome.css',
    './parent-footer.component.css',
  ]
})
export class ParentFooterComponent implements OnInit {


  userId: number;
  @Input() user: User;

  constructor(private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {

    this.userId = this.tokenStorage.getCurrentUser();

  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

}
