import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Ecole} from "../../models/Ecole";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {EcoleService} from "../../services/ecole.service";

@Component({
  selector: 'app-ecoles',
  templateUrl: './ecoles.component.html',
  styleUrls: ['./ecoles.component.css',
    '../../../assets/parent/css/styles.css',
    '../../../assets/parent/css/bootstrap.css',
    '../../../assets/parent/css/line-awesome/line-awesome.css',
    '../../../assets/front/css/toastr.css']
})
export class EcolesComponent implements OnInit {
  ecoles: Ecole[];
  ecole: Ecole;

  @Input() searchText;
  imageUrl = '../../assets/parent/img/imgKid.png';
  private params: any;

  constructor(private ecoleService: EcoleService,
              private activatedRoute: ActivatedRoute,
              private  authInterceptor: AuthInterceptor,
  ) {
    this.ecoles = new Array();
    this.ecole = new Ecole();

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;
    });
    this.searchEcole();
    this.initialisePicture();

  }

  initialisePicture() {
    let photoId = this.ecole.logo;
    if (photoId != null) {
      this.imageUrl = this.authInterceptor.BASE_URL + '/files/' + photoId;
    }
  }

  searchEcole() {
    this.activatedRoute.queryParams
      .subscribe(params => {

        this.ecoleService.searchCenterByName(params['name'], 0, 0).then(
          (data: any) => {
            this.ecoles = data;
            console.log(this.ecoles);

          }
        );

      });

  }
}
