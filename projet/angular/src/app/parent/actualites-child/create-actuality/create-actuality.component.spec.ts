import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateActualityComponent} from './create-actuality.component';
import {FormBuilder, FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {ActualitesChildComponent} from "../actualites-child.component";
import {AuthInterceptor} from "../../../services/authentification/auth-interceptor";

describe('CreateActualityComponent', () => {
  let component: CreateActualityComponent;
  let fixture: ComponentFixture<CreateActualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActualityComponent],
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
      providers: [FormBuilder, ActualitesChildComponent, AuthInterceptor]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
