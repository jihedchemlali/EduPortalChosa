import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActualitesChildComponent} from './actualites-child.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ToastrModule} from "ngx-toastr";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {CreateActualityComponent} from "./create-actuality/create-actuality.component";
import {PipeModule} from "../../pipe/pipe.module";
import {ActualityElementComponent} from "./actuality-element/actuality-element.component";

describe('ActualitesChildComponent', () => {
  let component: ActualitesChildComponent;
  let fixture: ComponentFixture<ActualitesChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
      declarations: [ActualitesChildComponent, CreateActualityComponent, ActualityElementComponent],
      providers: [AuthInterceptor, FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualitesChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
