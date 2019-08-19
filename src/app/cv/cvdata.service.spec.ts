import { TestBed } from '@angular/core/testing';

import { CVDataService } from './cvdata.service';

describe('CVDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CVDataService = TestBed.get(CVDataService);
    expect(service).toBeTruthy();
  });
});
