import {ApplicationInitStatus, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CommonModule} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, FormsModule} from "@angular/forms";
import {NgxCaptchaModule, ReCaptcha2Component} from "ngx-captcha";
import {ToastrModule} from "ngx-toastr";
import {timeout} from "rxjs/operators";
import {ScriptLoaderService} from "../services/script-loader.service";
import {FrontHeaderComponent} from "./front-header/front-header.component";
import {FrontComponent} from "./front.component";
import {AuthInterceptor} from "../services/authentification/auth-interceptor";

describe('FrontComponent', () => {
  let component: FrontComponent;
  let fixture: ComponentFixture<FrontComponent>;

  function tiemout(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  beforeEach(async () => {
    await TestBed.get(ApplicationInitStatus).donePromise;

    fixture = TestBed.createComponent(FrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.configureTestingModule({


        declarations: [FrontComponent, FrontHeaderComponent],

        schemas: [CUSTOM_ELEMENTS_SCHEMA],

        imports: [
          CommonModule,
          RouterTestingModule,
          HttpClientTestingModule,
          FormsModule,
          NgxCaptchaModule,
          ToastrModule.forRoot({
            toastClass: 'toast toast-bootstrap-compatibility-fix',
            timeOut: 3500,
            positionClass: 'toast-top-right'
          }),
        ],


        providers: [FormBuilder, ScriptLoaderService, AuthInterceptor, ChangeDetectorRef, NgxCaptchaModule, ReCaptcha2Component]
      }
    );


    it('should create', async () => {
      await timeout(2000);
      console.log('ruuuuuuun teeeest');
      expect(component).toBeTruthy();
    })
  })
});
