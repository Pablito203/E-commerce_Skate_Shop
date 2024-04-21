import { TestBed } from '@angular/core/testing';

import { SacolaService } from './sacola.service';

describe('SacolaService', () => {
  let service: SacolaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SacolaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
