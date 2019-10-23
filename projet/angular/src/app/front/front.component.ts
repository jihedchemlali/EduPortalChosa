import {Location} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgxCaptchaModule, ReCaptcha2Component} from "ngx-captcha";
import {ToastrService} from "ngx-toastr";
import {User} from "../models/User";
import {AuthInterceptor} from "../services/authentification/auth-interceptor";
import {TokenStorageService} from "../services/authentification/token-storage.service";
import {ScriptLoaderService} from "../services/script-loader.service";
import {UserService} from "../services/user.service";

declare var hljs: any;

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: [
    '../../assets/front/css/bootstrap.css',
    '../../assets/front/css/styles.css',
    '../../assets/front/css/line-awesome/line-awesome.css',
    './front.component.css',

  ],
  encapsulation:ViewEncapsulation.None
})

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgxCaptchaModule]
  ,
  exports: [
    NgxCaptchaModule,
    ReCaptcha2Component
  ]
  , providers: [ReCaptcha2Component]
})

export class FrontComponent implements OnInit, AfterViewInit {

  public readonly siteKey = '6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1';
  registerForm: FormGroup;
  submitted = false;
  accepted = false;
  name = '';
  message = '';
  declarativeFormCaptchaValue = '';
  email = '';
  private token: string;
  protected aFormGroup: FormGroup;

  user: User;
  public imageUrl = '../../../assets/parent/img/photoProfilParent.png';
  public test: boolean;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public size: 'compact' | 'normal' = 'normal';
  public lang = 'fr';
  public type: 'image' | 'audio';

  get f() {
    return this.registerForm.controls;
  }

  @ViewChild('captchaElem', {}) captchaElem: ReCaptcha2Component;

  constructor(private cdr: ChangeDetectorRef, private scriptLoader: ScriptLoaderService, private _location: Location, private route: ActivatedRoute, public userService: UserService, private  authInterceptor: AuthInterceptor, private tokenStorage: TokenStorageService, public service: UserService, private toastr: ToastrService, private router: Router, private formBuilder: FormBuilder) {
    this.user = new User();
  }

  ngOnInit() {
    this.loadScripts();
    this.submitted = false;
    this.accepted = false;
    this.resetForm();
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    this.route.queryParams.subscribe((params: Params) => {
      this.token = params['token'];
      this.user.email = params['email'];
    });

    this.verifyToken();
    let photoId: string = null;
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      photoId = this.user.user_picture_file;
    }

    if (photoId != null) {
      this.imageUrl = this.authInterceptor.BASE_URL + '/files/' + photoId;
    }
  }

  private loadScripts() {
    this.scriptLoader.loadScript('JquerySlim')
      .then(data => {
        this.scriptLoader.loadScript('Bootstrap');
      })
      .then(data => {
        this.scriptLoader.loadScript('Jquery');
      })
      .then(data => {
        this.scriptLoader.loadScript('Scripts');
      });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  resetForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  contact() {
    if (this.email === '' || this.name === '' || this.message === '') {
      this.toastr.error('Merci de bien vouloir vérifier vos informations', 'Echec!');
    } else {
      this.service.contactAdmin(this.name, this.email, this.message).then(
        data => {
          this.toastr.success('Merci ! Votre message a bien été envoyé. Nous y répondrons dès que possible.', 'Contact', {progressBar: true});
        }
      ).catch(
        data => {
          this.toastr.error('Merci de bien vouloir vérifier vos informations', 'Echec!');
        }
      );
    }
  }

  private verifyToken() {
    this.userService.verifyTokenNotExpired()
      .then(
        data => {
          this.test = true;
        })
      .catch(err => {
        this.test = false;
      });
  }

  backClicked() {
    let roles = this.tokenStorage.getAuthorities();
    if (roles.includes('PARENT')) {
      this.router.navigate(['parent/accueil']);
    } else if (roles.includes('FORMATION')) {
      this.router.navigate(['/ecole/accueil']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  profil() {
    let roles = this.tokenStorage.getAuthorities();
    if (roles.includes('PARENT')) {
      this.router.navigate(['parent/profil']);
    } else if (roles.includes('FORMATION')) {
      this.router.navigate(['ecole/profil']);
    } else {
      this.router.navigate(['/']);
    }
  }

  surfParametre() {
    let roles = this.tokenStorage.getAuthorities();
    if (roles.includes('PARENT')) {
      this.router.navigate(['parent/parametre']);
    } else if (roles.includes('FORMATION')) {
      this.router.navigate(['ecole/parametre']);
    } else {
      this.router.navigate(['/']);
    }
  }

  surfNotifications() {
    let roles = this.tokenStorage.getAuthorities();
    if (roles.includes('PARENT')) {
      this.router.navigate(['parent/notifications']);
    } else if (roles.includes('FORMATION')) {
      this.router.navigate(['ecole/notifications']);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit(): void {
    this.highlight();
  }

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
    this.cdr.detectChanges();
  }

  reset(): void {
    this.captchaElem.resetCaptcha();
  }

  reload(): void {
    this.captchaElem.reloadCaptcha();
  }

  getCaptchaId(): void {
    alert(this.captchaElem.getCaptchaId());
  }

  private highlight(): void {
    const highlightBlocks = document.getElementsByTagName('code');
    for (let i = 0; i < highlightBlocks.length; i++) {
      const block = highlightBlocks[i];
      hljs.highlightBlock(block);
    }
  }

}
