import {getTestBed, TestBed} from '@angular/core/testing';

import {FileService} from './file.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('FileService', () => {

  let httpMock: HttpTestingController;
  let fileService: FileService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileService]
    });
    httpMock = getTestBed().get(HttpTestingController);
    fileService = getTestBed().get(FileService);
  });

  it('should be created', () => {
    const service: FileService = TestBed.get(FileService);
    expect(service).toBeTruthy();
  });

  const formData = new FormData();

  describe('#verifyToken()', () => {
    it('returned Observable should match the right data', () => {
      fileService.upload('url', formData);
      httpMock.expectNone("/users/verify-token");
    });
  });
});
