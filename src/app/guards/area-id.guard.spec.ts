import { TestBed } from '@angular/core/testing';

import { AreaIdGuard } from './area-id.guard';

describe('AreaIdGuard', () => {
  let guard: AreaIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AreaIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
