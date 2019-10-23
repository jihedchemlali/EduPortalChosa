import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {ToastrModule} from "ngx-toastr";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {ParentFooterComponent} from "../parent-footer/parent-footer.component";
import {ParentHeaderComponent} from "../parent-header/parent-header.component";

import {ParentProfilComponent} from './parent-profil.component';

describe('ParentProfilComponent', () => {
  let component: ParentProfilComponent;
  let fixture: ComponentFixture<ParentProfilComponent>;

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
      declarations: [ParentProfilComponent, ParentFooterComponent, ParentHeaderComponent],
      providers: [AuthInterceptor]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
