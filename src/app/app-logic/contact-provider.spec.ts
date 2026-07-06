import { TestBed } from '@angular/core/testing';

import { ContactProvider } from './contact-provider';

describe('ContactProvider', () => {
  let service: ContactProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
