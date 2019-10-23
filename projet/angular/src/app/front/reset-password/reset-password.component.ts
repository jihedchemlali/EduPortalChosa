import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css',
    '../../../assets/front/css/bootstrap.css',
    '../../../assets/front/css/styles.css']
})
export class ResetPasswordComponent implements OnInit {

  public user: User;
  public password: string;
  public confirmPassword: string;
  private token: string;

  constructor(public userService: UserService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
    this.user = new User();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.token = params['token'];
      this.user.email = params['email'];
    });
    this.verifyToken();
  }

  private verifyToken() {
    this.userService.verifyToken(this.user, this.token)
      .then(
        data => {
          this.user.id = data.id;
        }
      )
      .catch(err => {
        this.toastr.error("Backend Error!!", "");
        this.router.navigate(['/login']);
      });
  }

  resetPassword() {
    if (this.password === this.confirmPassword) {
      this.user.userPassword = this.password;
      this.userService.resetPassword(this.user)
        .then(data => {
          this.toastr.success("Mot de passe est mise à jour");
          this.router.navigate(['/login']);
        })
        .catch(err => {
          this.toastr.error("Backend Error!!", "");
          this.router.navigate(['/login']);
        });
    } else {
      this.toastr.error("passwords not equals", "");
    }
  }
}
