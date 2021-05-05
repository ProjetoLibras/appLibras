import { TestBed } from '@angular/core/testing';

import { AttendlistService } from './attendlist.service';

describe('AttendlistServiceService', () => {
  let service: AttendlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
