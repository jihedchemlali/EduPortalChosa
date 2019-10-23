import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {getTestBed, TestBed} from '@angular/core/testing';

import {ActualityService} from './actuality.service';

describe('ActualityService', () => {
  let httpMock: HttpTestingController;
  let actualityService: ActualityService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActualityService]
    });
    httpMock = getTestBed().get(HttpTestingController);
    actualityService = getTestBed().get(ActualityService);
  });

  it('should be created', () => {
    // const service: ActualityService = TestBed.get(ActualityService);
    expect(actualityService).toBeTruthy();
  });

  const actuality = {
    id: null,
    child: 1,
    file: null,
    commentaire: 'commentaire',
    type: null,
    creationDate: 'creationDate',
  };

  // it('ActualityService.createActuality', () => {
  //   actualityService.createActuality(actuality);
  //   const req = httpMock.expectOne(actualityService.POST_ACT);
  //   expect(req.request.method).toEqual('POST');
  //   req.flush(actuality);
  // });
});
