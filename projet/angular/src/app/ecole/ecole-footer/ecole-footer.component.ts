import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../../models/User";

@Component({
  selector: 'app-ecole-footer',
  templateUrl: './ecole-footer.component.html',
  styleUrls: [
    '../../../assets/ecole/css/bootstrap.css',
    '../../../assets/ecole/css/styles.css',
    '../../../assets/ecole/css/line-awesome/line-awesome.css',
    './ecole-footer.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class EcoleFooterComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() { }

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
