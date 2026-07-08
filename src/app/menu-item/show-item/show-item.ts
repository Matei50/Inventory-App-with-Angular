import { Component, OnInit } from '@angular/core';
import { InventoryListMock } from '../../app-logic/inventory-list-mock';
import { InventoryItem } from '../../app-logic/inventory-item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-item',
  standalone: false,
  templateUrl: './show-item.html',
  styleUrl: './show-item.css',
})
export class ShowItem implements OnInit {
  itemId!: number;
  item!: InventoryItem;
  itemFound = false;

  constructor(
    private inventoryListMock: InventoryListMock,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'] ?? 0;
    });
  }
  ngOnInit(): void {
    this.item = this.inventoryListMock.getItemById(this.itemId);
    this.itemFound = this.item ? true : false;
  }

  editItem() {
    this.router.navigate(['/edit', this.itemId]);
  }
}
