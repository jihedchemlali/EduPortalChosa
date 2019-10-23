import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css',
    '../../../assets/front/css/bootstrap.css',
    '../../../assets/front/css/styles.css']
})
export class ForgetPasswordComponent implements OnInit {

  public email: string = '';
  public error: string;
  public success: string;
  public info: string;

  constructor(public userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  sendResetEmail() {
    this.userService.sendResetEmail(this.email)
      .then(
        (response: any) => {
          this.toastr.success("Vérifier votre Email");
          this.router.navigate(['/login']);
        }
      )
      .catch(
        (response: any) => {
          this.toastr.error("User not Found");
          this.router.navigate(['/login']);
        }
      );
  }
}
