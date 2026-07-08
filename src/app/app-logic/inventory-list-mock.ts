import { Injectable } from '@angular/core';
import { InventoryItem } from './inventory-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryListMock {
  inventoryData: Array<InventoryItem> = [];

  constructor(private httpClient: HttpClient) {}

  private apiUrl = 'https://localhost:7106/api/InventoryItem';

  getData(): Observable<Array<InventoryItem>> {
    return this.httpClient.get<Array<InventoryItem>>(this.apiUrl);
  }

  addItem(item: InventoryItem): void {
    this.httpClient.post<InventoryItem>(this.apiUrl, item).subscribe((data) => {
      console.log(data);
    });
  }

  getLastId(): number {
    return Math.max.apply(
      Math,
      this.inventoryData.map((item) => item.id),
    );
  }

  getItemById(id: number): InventoryItem {
    return this.inventoryData.filter((item) => item.id == id)[0];
  }
}
