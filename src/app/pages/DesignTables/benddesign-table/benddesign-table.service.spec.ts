import { TestBed } from '@angular/core/testing';

import { BenddesignTableService } from './benddesign-table.service';

describe('BenddesignTableService', () => {
  let service: BenddesignTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BenddesignTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
