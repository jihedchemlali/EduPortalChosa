import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdhererEnfantModalComponent} from './adherer-enfant-modal.component';
import {FormsModule} from "@angular/forms";
import {PipeModule} from "../../pipe/pipe.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {CommonModule} from "@angular/common";
import {CenterCardComponent} from "./center-card/center-card.component";

describe('AdhererEnfantModalComponent', () => {
  let component: AdhererEnfantModalComponent;
  let fixture: ComponentFixture<AdhererEnfantModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhererEnfantModalComponent, CenterCardComponent],
      imports: [
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
      providers: []

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhererEnfantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
