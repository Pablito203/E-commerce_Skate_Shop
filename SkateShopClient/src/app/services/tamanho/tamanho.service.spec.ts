import { TestBed } from '@angular/core/testing';

import { TamanhoService } from './tamanho.service';

describe('TamanhoService', () => {
  let service: TamanhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TamanhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
