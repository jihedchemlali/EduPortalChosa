import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormBuilder, FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CommonModule} from "@angular/common";
import {ToastrModule} from "ngx-toastr";
import {PipeModule} from "../../../pipe/pipe.module";
import {AuthInterceptor} from "../../../services/authentification/auth-interceptor";
import {ActualitiesEnfantComponent} from "../actualities-enfant.component";
import {CreateActualityEcoleComponent} from "./create-actuality-ecole.component";

describe('CreateActualityEcoleComponent', () => {
  let component: CreateActualityEcoleComponent;
  let fixture: ComponentFixture<CreateActualityEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActualityEcoleComponent],
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
      providers: [FormBuilder, ActualitiesEnfantComponent, AuthInterceptor]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActualityEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
