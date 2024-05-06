import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { docenteDataResolver } from './docente-data.resolver';

describe('docenteDataResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => docenteDataResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
