import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationParentComponent } from './notification-parent.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PipeModule} from "../../pipe/pipe.module";

describe('NotificationParentComponent', () => {
  let component: NotificationParentComponent;
  let fixture: ComponentFixture<NotificationParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationParentComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        CommonModule,
        PipeModule
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
