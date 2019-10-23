import { TestBed } from '@angular/core/testing';

import { GetterSetterChildService } from './getter-setter-child.service';

describe('GetterSetterChildService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetterSetterChildService = TestBed.get(GetterSetterChildService);
    expect(service).toBeTruthy();
  });
});
