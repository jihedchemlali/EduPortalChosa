import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";

import {ParentComponent} from './parent.component';
import {ToastrModule} from "ngx-toastr";
import {AuthInterceptor} from "../services/authentification/auth-interceptor";
import {ParentHeaderComponent} from "./parent-header/parent-header.component";
import {ParentSidebarComponent} from "./parent-sidebar/parent-sidebar.component";
import {ParentFooterComponent} from "./parent-footer/parent-footer.component";
import {FormBuilder, FormsModule} from "@angular/forms";

describe('ParentSidebarComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ToastrModule.forRoot({
          toastClass: 'toast toast-bootstrap-compatibility-fix',
          timeOut: 3500,
          positionClass: 'toast-top-right'
        }),
      ],
      declarations: [ParentComponent, ParentHeaderComponent, ParentSidebarComponent, ParentFooterComponent],
      providers: [AuthInterceptor, FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
