import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderComponent } from './admin-header.component';
import {CommonModule} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, FormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {ScriptLoaderService} from "../../services/script-loader.service";
import {PipeModule} from "../../pipe/pipe.module";

describe('AdminHeaderComponent', () => {
  let component: AdminHeaderComponent;
  let fixture: ComponentFixture<AdminHeaderComponent>;

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
        PipeModule
      ],
      declarations: [AdminHeaderComponent],
      providers: [FormBuilder, ScriptLoaderService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
