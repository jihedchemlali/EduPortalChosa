import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Child} from "../../models/Child";
import {Ecole} from "../../models/Ecole";
import {User} from "../../models/User";
import {ChildService} from "../../services/child.service";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../services/authentification/token-storage.service";

@Component({
  selector: '[app-ecole-child]',
  templateUrl: './ecole-child.component.html',
  styleUrls: [
    '../../../assets/ecole/css/bootstrap.css',
    '../../../assets/ecole/css/styles.css',
    '../../../assets/ecole/css/line-awesome/line-awesome.css',
    './ecole-child.component.css',

  ]
})
export class EcoleChildComponent implements OnInit {
  @Input() child: Child;
  @Input() ecole: Ecole;
  @Output() membre = new EventEmitter();
  parent: User;
  imageUrl = '../../assets/ecole/img/imgKid.png';
  userId: number;

  constructor(private tokenStorage: TokenStorageService, private childService: ChildService, private toastr: ToastrService, private authInterceptor: AuthInterceptor) {
    this.child = new Child();
    this.parent = new User();
  }

  ngOnInit() {
    this.userId = this.tokenStorage.getCurrentUser();
    let photoId = this.child.picture;
    if (photoId != null) {
      this.imageUrl = this.authInterceptor.BASE_URL + '/files/' + photoId;
    }

  }

  deleteChild() {
    this.membre.emit(this.child);
  }

  updateEnfant(status: string) {
    this.child.status = status;
    this.childService.updateChild(this.child, this.ecole.id, 'notify').then(data => {
      this.toastr.success("Modification bien enregistré !");
      this.membre.emit(this.child);
    });


  }
}
