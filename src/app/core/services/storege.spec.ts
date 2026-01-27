import { TestBed } from '@angular/core/testing';

import { Storege } from './storege';

describe('Storege', () => {
  let service: Storege;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Storege);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
