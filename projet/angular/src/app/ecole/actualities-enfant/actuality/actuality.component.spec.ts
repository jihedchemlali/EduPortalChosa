import {HttpClientTestingModule} from "@angular/common/http/testing";
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActualityComponent} from './actuality.component';
import {PipeModule} from '../../../pipe/pipe.module';
import {AuthInterceptor} from '../../../services/authentification/auth-interceptor';

describe('ActualityComponent', () => {
  let component: ActualityComponent;
  let fixture: ComponentFixture<ActualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PipeModule,
        HttpClientTestingModule
      ],
      declarations: [ActualityComponent],
      providers: [AuthInterceptor]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
