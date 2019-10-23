import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {ToastrModule} from "ngx-toastr";
import {ParentFooterComponent} from "../parent-footer/parent-footer.component";

import {ParentSettingsComponent} from './parent-settings.component';
import {ParentHeaderComponent} from "../parent-header/parent-header.component";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";

describe('ParentSettingsComponent', () => {
  let component: ParentSettingsComponent;
  let fixture: ComponentFixture<ParentSettingsComponent>;

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
      declarations: [ParentSettingsComponent, ParentFooterComponent, ParentHeaderComponent],
      providers: [FormBuilder, AuthInterceptor]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
