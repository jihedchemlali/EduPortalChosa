import {HttpClientTestingModule} from "@angular/common/http/testing";
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserService} from "../../../services/user.service";

import {ActualityElementComponent} from './actuality-element.component';
import {PipeModule} from "../../../pipe/pipe.module";
import {AuthInterceptor} from "../../../services/authentification/auth-interceptor";

describe('ActualityElementComponent', () => {
  let component: ActualityElementComponent;
  let fixture: ComponentFixture<ActualityElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActualityElementComponent],
      imports: [PipeModule,
        HttpClientTestingModule,
      ],
      providers: [AuthInterceptor, UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualityElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
