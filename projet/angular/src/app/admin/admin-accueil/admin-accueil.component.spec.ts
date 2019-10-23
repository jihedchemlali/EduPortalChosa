import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAccueilComponent} from './admin-accueil.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ToastrModule} from "ngx-toastr";
import {PipeModule} from "../../pipe/pipe.module";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";

describe('AdminAccueilComponent', () => {
  let component: AdminAccueilComponent;
  let fixture: ComponentFixture<AdminAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        CommonModule,
        ToastrModule.forRoot({
          toastClass: 'toast toast-bootstrap-compatibility-fix',
          timeOut: 3500,
          positionClass: 'toast-top-right'

        }),
        PipeModule
      ],
      declarations: [AdminAccueilComponent],
      providers: [AuthInterceptor]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
