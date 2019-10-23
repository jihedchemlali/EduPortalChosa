import {getTestBed, TestBed} from '@angular/core/testing';

import {NotificationService} from './notification.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserService} from "./user.service";

describe('NotificationService', () => {
  let httpMock: HttpTestingController;
  let notificationService: NotificationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    httpMock = getTestBed().get(HttpTestingController);
    notificationService = getTestBed().get(UserService);
  });

  it('it is created', () => {
    expect(notificationService).toBeTruthy();
  });
});
