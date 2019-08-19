import { TestBed } from '@angular/core/testing';

import { ProjectsDataService } from './projects-data.service';

describe('ProjectsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectsDataService = TestBed.get(ProjectsDataService);
    expect(service).toBeTruthy();
  });
});
