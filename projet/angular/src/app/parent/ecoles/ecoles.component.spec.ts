import {HttpClientTestingModule} from "@angular/common/http/testing";
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {PipeModule} from "../../pipe/pipe.module";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";

import {EcolesComponent} from './ecoles.component';

describe('EcolesComponent', () => {
  let component: EcolesComponent;
  let fixture: ComponentFixture<EcolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        PipeModule
      ],
      declarations: [EcolesComponent],
      providers: [AuthInterceptor]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
