import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actuality} from "../../../models/Actuality";
import {User} from "../../../models/User";
import {AuthInterceptor} from "../../../services/authentification/auth-interceptor";
import {TokenStorageService} from "../../../services/authentification/token-storage.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: '[app-actuality-element]',
  templateUrl: './actuality-element.component.html',
  styleUrls: ['./actuality-element.component.css',
    '../../../../assets/parent/css/bootstrap.css',
    '../../../../assets/parent/css/styles.css',
    '../../../../assets/parent/css/line-awesome/line-awesome.css',
    '../../../../assets/front/css/toastr.css']
})
export class ActualityElementComponent implements OnInit {
  @Input() actuality: Actuality;
  @Output() membre = new EventEmitter();
  imageUrl = null;
  userId: number;
  @Input() user: User;
  @Input() parent: User;

  constructor(private authInterceptor: AuthInterceptor,
              private userService: UserService,
              private tokenStorage: TokenStorageService) {
    this.actuality = new Actuality();
    this.userId = this.tokenStorage.getCurrentUser();
  }

  ngOnInit() {
    let photoId = this.actuality.file;
    if (photoId != null) {
      this.imageUrl = this.authInterceptor.BASE_URL + '/files/' + photoId;
    }
    this.parentChild();

  }

  emitActuality() {
    this.membre.emit(this.actuality);
  }

  parentChild() {
    this.userService.getUser(this.actuality.user).then((data: any) => {
      this.parent = data;
    })
  }
}
