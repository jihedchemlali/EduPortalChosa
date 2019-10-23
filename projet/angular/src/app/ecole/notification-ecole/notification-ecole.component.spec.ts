import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotificationEcoleComponent} from './notification-ecole.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PipeModule} from "../../pipe/pipe.module";

describe('NotificationEcoleComponent', () => {
  let component: NotificationEcoleComponent;
  let fixture: ComponentFixture<NotificationEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationEcoleComponent],
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
    fixture = TestBed.createComponent(NotificationEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
