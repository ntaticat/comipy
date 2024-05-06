import { TestBed } from '@angular/core/testing';

import { ComipyApiService } from './comipy-api.service';

describe('ComipyApiService', () => {
  let service: ComipyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComipyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
