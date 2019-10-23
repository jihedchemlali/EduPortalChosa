import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {getTestBed, TestBed} from '@angular/core/testing';

import {EcoleService} from './ecole.service';

describe('EcoleService', () => {
  let httpMock: HttpTestingController;
  let ecoleService: EcoleService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });
    httpMock = getTestBed().get(HttpTestingController);
    ecoleService = getTestBed().get(EcoleService);
  });


  it('should be created', () => {
    const ecoleService: EcoleService = TestBed.get(EcoleService);
    expect(ecoleService).toBeTruthy()
  });
});
