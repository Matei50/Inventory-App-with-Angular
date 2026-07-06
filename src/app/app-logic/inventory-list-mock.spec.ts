import { TestBed } from '@angular/core/testing';

import { InventoryListMock } from './inventory-list-mock';

describe('InventoryListMock', () => {
  let service: InventoryListMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryListMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
