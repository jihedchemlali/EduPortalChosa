import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {ToastrModule} from "ngx-toastr";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {EcoleFooterComponent} from "../ecole-footer/ecole-footer.component";
import {EcoleHeaderComponent} from "../ecole-header/ecole-header.component";

import { EcoleProfilComponent } from './ecole-profil.component';

describe('EcoleProfilComponent', () => {
  let component: EcoleProfilComponent;
  let fixture: ComponentFixture<EcoleProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ToastrModule.forRoot({
          toastClass: 'toast toast-bootstrap-compatibility-fix',
          timeOut: 3500,
          positionClass: 'toast-top-right'
        }),
      ],
      providers: [FormBuilder,AuthInterceptor],
      declarations: [ EcoleProfilComponent ,EcoleFooterComponent, EcoleHeaderComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoleProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
