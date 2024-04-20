import { TestBed } from '@angular/core/testing';

import { CompdesignTableService } from './compdesign-table.service';

describe('CompdesignTableService', () => {
  let service: CompdesignTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompdesignTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
