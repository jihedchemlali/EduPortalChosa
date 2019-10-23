import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateChildComponent} from './create-child.component';
import {FormBuilder, FormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {AuthInterceptor} from "../../../services/authentification/auth-interceptor";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CreateChildComponent', () => {
  let component: CreateChildComponent;
  let fixture: ComponentFixture<CreateChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ToastrModule.forRoot({
          toastClass: 'toast toast-bootstrap-compatibility-fix',
          timeOut: 3500,
          positionClass: 'toast-top-right'
        }),
      ],
      declarations: [CreateChildComponent],
      providers: [FormBuilder, AuthInterceptor]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
