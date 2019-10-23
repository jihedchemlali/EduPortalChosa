import {CommonModule} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastrModule} from 'ngx-toastr';
import {PipeModule} from '../../pipe/pipe.module';
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {ActualitiesEnfantComponent} from "./actualities-enfant.component";
import {ActualityComponent} from './actuality/actuality.component';
import {CreateActualityEcoleComponent} from "./create-actuality-ecole/create-actuality-ecole.component";

describe('ActualityComponent', () => {
  let component: ActualitiesEnfantComponent;
  let fixture: ComponentFixture<ActualitiesEnfantComponent>;

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
      declarations: [ActualitiesEnfantComponent, CreateActualityEcoleComponent, ActualityComponent],
      providers: [FormBuilder, AuthInterceptor]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualitiesEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
