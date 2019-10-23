import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/authentification/token-storage.service";

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css',
    '../../../assets/front/css/bootstrap.css',
    '../../../assets/front/css/custom.css']
})
export class ValidationComponent implements OnInit {

  constructor(public service: UserService, private router: Router, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.tokenStorage.signOut();

    this.service.validateAccount(this.router.url).subscribe((data: any) => {
    })
  }

}
