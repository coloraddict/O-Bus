import { TestBed } from '@angular/core/testing';

import { ApiLoader } from './api-loader';

describe('ApiLoader', () => {
  let service: ApiLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
