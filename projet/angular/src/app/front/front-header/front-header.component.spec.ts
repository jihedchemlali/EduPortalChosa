import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {ToastrModule} from "ngx-toastr";
import {PipeModule} from "../../pipe/pipe.module";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";

import {FrontHeaderComponent} from './front-header.component';

describe('FrontHeaderComponent', () => {
  let component: FrontHeaderComponent;
  let fixture: ComponentFixture<FrontHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ToastrModule.forRoot({
          toastClass: 'toast toast-bootstrap-compatibility-fix',
          timeOut: 3500,
          positionClass: 'toast-top-right'
        }),
        PipeModule
      ],
      declarations: [FrontHeaderComponent],
      providers: [AuthInterceptor]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
