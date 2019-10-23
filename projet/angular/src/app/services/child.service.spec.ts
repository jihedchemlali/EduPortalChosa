import {getTestBed, TestBed} from '@angular/core/testing';

import {ChildService} from './child.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserService} from "./user.service";

describe('ChildService', () => {

  let httpMock: HttpTestingController;
  let childService: ChildService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChildService]
    });
    httpMock = getTestBed().get(HttpTestingController);
    childService = getTestBed().get(ChildService);
  });

  it('should be created', () => {
    const service: ChildService = TestBed.get(ChildService);
    expect(service).toBeTruthy();
  });
});
