import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EcoleSidebarComponent} from './ecole-sidebar.component';
import {FormBuilder, FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CommonModule} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {AuthInterceptor} from '../../services/authentification/auth-interceptor';

describe('EcoleSidebarComponent', () => {
  let component: EcoleSidebarComponent;
  let fixture: ComponentFixture<EcoleSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EcoleSidebarComponent],
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
      ],
      providers: [FormBuilder, AuthInterceptor]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoleSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
