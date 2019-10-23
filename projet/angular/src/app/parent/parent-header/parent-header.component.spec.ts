import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

import {ToastrModule} from "ngx-toastr";
import {ParentHeaderComponent} from "./parent-header.component";

describe('ParentSidebarComponent', () => {
  let component: ParentHeaderComponent;
  let fixture: ComponentFixture<ParentHeaderComponent>;

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
      declarations: [ParentHeaderComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
