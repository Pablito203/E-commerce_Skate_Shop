import { TestBed } from '@angular/core/testing';

import { AnexoLocalService } from './anexo-local.service';

describe('AnexoLocalService', () => {
  let service: AnexoLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnexoLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
