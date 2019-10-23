import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminColoriageComponent} from './admin-coloriage.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ToastrModule} from "ngx-toastr";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";

describe('AdminColoriageComponent', () => {
  let component: AdminColoriageComponent;
  let fixture: ComponentFixture<AdminColoriageComponent>;

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

        })
      ],
      declarations: [AdminColoriageComponent],
      providers: [FormBuilder, AuthInterceptor]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminColoriageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
