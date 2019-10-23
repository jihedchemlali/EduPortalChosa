import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Child} from "../../models/Child";
import {Ecole} from "../../models/Ecole";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {ChildService} from "../../services/child.service";

@Component({
  selector: '[app-child]',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css',
    '../../../assets/parent/css/styles.css',
    '../../../assets/parent/css/bootstrap.css',
    '../../../assets/parent/css/line-awesome/line-awesome.css',
    '../../../assets/front/css/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChildComponent implements OnInit {

  @Input() child: Child;
  ecole: Ecole;
  @Output() membre = new EventEmitter();
  imageUrl = '../../assets/parent/img/imgKid.png';

  constructor(private router: Router,
              private childService: ChildService,
              private  authInterceptor: AuthInterceptor,
              private toastr: ToastrService) {
    this.child = new Child();
    this.ecole = new Ecole();
  }

  ngOnInit() {
    let photoId = this.child.picture;
    if (photoId != null) {
      this.imageUrl = this.authInterceptor.BASE_URL + '/files/' + photoId;
    }
    this.childService.getChildEcole(this.child.id).then(
      (data: any) => {
        if (data != null) {
          this.child.center = data.id;
        }
      }
    );
  }

  emitChild() {
    this.membre.emit(this.child);

  }

  cancelDemand() {
    this.childService.addChildToCenter(this.child, 'NEW', null).then(
      (data: any) => {
        this.child = data;
        this.toastr.success("demande envoyé! attente de confirmation par le manager");
      }
    ).catch(
      (data: any) => {
        this.toastr.error("Erreur est produite");
      }
    );
  }
}
