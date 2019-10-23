import {getTestBed, TestBed} from '@angular/core/testing';

import { ActivityService } from './activity.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ActivityService', () => {
  let httpMock: HttpTestingController;
  let activityService: ActivityService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivityService]
    });
    httpMock = getTestBed().get(HttpTestingController);
    activityService = getTestBed().get(ActivityService);
  });

  it('should be created', () => {
    // const service: ActivityService = TestBed.get(ActivityService);
    expect(activityService).toBeTruthy();
  });
});
