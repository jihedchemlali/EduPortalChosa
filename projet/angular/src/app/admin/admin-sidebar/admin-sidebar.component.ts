import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../../models/User";
import {ScriptLoaderService} from "../../services/script-loader.service";

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: [
     '../../../assets/admin/css/all.min.css',
     '../../../assets/admin/css/OverlayScrollbars.min.css',
     '../../../assets/admin/css/adminlte.min.css',
    './admin-sidebar.component.css'
  ]
  , encapsulation: ViewEncapsulation.None
})
export class AdminSidebarComponent implements OnInit {

  @Input() user: User = new User();
  @Input() imageUrl: string;

  constructor(private scriptLoader: ScriptLoaderService) {
  }

  ngOnInit() {
    // this.loadScripts();
    if (this.user == null) {
      this.user = new User();
      this.user.prenom = '';
    }
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
