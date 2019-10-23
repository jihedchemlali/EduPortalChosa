import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {TokenStorageService} from "../../services/authentification/token-storage.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['../front.component.css', '../../../assets/front/css/styles.css',
    '../../../assets/front/css/bootstrap.css',
    '../../../assets/front/css/toastr.css',
    '../../../assets/front/css/line-awesome/line-awesome.css',
    '../../../assets/front/css/fontawesome/fontawesome.css'
  ]
})
export class InscriptionComponent implements OnInit {

  public user: User;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  accepted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  get f() {
    return this.registerForm.controls;
  }

  constructor(public service: UserService, private toastr: ToastrService, private router: Router, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.loading = false;
    this.submitted = false;
    this.accepted = false;
    this.resetForm();
    this.tokenStorage.signOut();
  }

  setStyle() {
    if (this.submitted && !this.accepted) {
      return {
        'border-color': 'red',
        'box-shadow': '0 0 10px red'
      };
    }
  }

  style() {
    if (this.submitted && !this.accepted) {
      return {'color': 'red'};
    }
  }

  resetForm() {
    this.submitted = false;
    this.accepted = false;
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      userPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required,],
      accepted: [this.accepted, Validators.required]
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.service.postUser(this.registerForm.value)
      .subscribe(
        () => {
          this.toastr.success('Merci de vérifier votre boite Mail', 'Bienvenue Sur Chosa', {progressBar: true});
          this.resetForm();
        },
        () => {
          this.toastr.error('Déjà inscrit !!');
          this.resetForm();
        });
  }
}
