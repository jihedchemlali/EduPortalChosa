import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";
import {NgxCaptchaModule, ReCaptcha2Component} from "ngx-captcha";
import {LoadingBarModule} from "ngx-loading-bar";
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ForgetPasswordComponent} from './front/forget-password/forget-password.component';
import {FrontHeaderComponent} from './front/front-header/front-header.component';
import {FrontComponent} from './front/front.component';
import {InscriptionComponent} from './front/inscription/inscription.component';
import {PresentationComponent} from './front/links/presentation/presentation.component';
import {TermesConditionsComponent} from './front/links/termes-conditions/termes-conditions.component';
import {LoginComponent} from './front/login/login.component';
import {ResetPasswordComponent} from './front/reset-password/reset-password.component';
import {ServicesComponent} from './front/services/services.component';
import {ValidationComponent} from './front/validation/validation.component';
import {PipeModule} from "./pipe/pipe.module";
import {AuthInterceptor, httpInterceptorProviders} from './services/authentification/auth-interceptor';

@NgModule({

  declarations: [
    AppComponent,
    FrontComponent,
    LoginComponent,
    InscriptionComponent,
    ValidationComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    ServicesComponent,
    FrontHeaderComponent,
    TermesConditionsComponent,
    PresentationComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,

    LoadingBarModule,
    ToastrModule.forRoot({
      toastClass: 'toast toast-bootstrap-compatibility-fix',
      timeOut: 2000,
      positionClass: 'toast-top-right'

    }),
    ReactiveFormsModule,
    PipeModule,
    RouterModule,
    NgxCaptchaModule,


    // AdminModule,
  ],
  exports: [FrontHeaderComponent, NgxCaptchaModule, ReCaptcha2Component],
  providers: [httpInterceptorProviders, AuthInterceptor, NgxCaptchaModule, ReCaptcha2Component
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
