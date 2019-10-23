import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EcoleChildComponent} from './ecole-child.component';
import {PipeModule} from '../../pipe/pipe.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {AuthInterceptor} from '../../services/authentification/auth-interceptor';

describe('EcoleChildComponent', () => {
  let component: EcoleChildComponent;
  let fixture: ComponentFixture<EcoleChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EcoleChildComponent],
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
      providers: [AuthInterceptor]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoleChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
