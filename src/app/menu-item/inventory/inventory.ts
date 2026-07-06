import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core'; /* se uita pe cel de html si incearca sa indentifice un element care este paginator ul pt noi*/
import { InventoryListMock } from '../../app-logic/inventory-list-mock';
import { InventoryItem } from '../../app-logic/inventory-item';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory implements OnInit {
  @ViewChild(MatPaginator, { static: true }) /* static = true prioritizeaza cautarea*/ paginator:
    MatPaginator | undefined; /*cauta primul el de Matpaginator */

  @ViewChild(MatSort, { static: true }) /* static = true prioritizeaza cautarea*/ sort:
    MatSort | undefined; /*cauta primul el de Matsort */

  InventoryItems: any; /*accepta si null */
  constructor(private inventoryListMock: InventoryListMock) {}

  InventoryColumns: string[] = [
    'select',
    'id',
    'name',
    'user',
    'description',
    'location',
    'inventoryNumber',
    'createdAt',
    'modifiedAt',
    'deleted',
    'actions',
  ];

  selection = new SelectionModel<Element>(true, []);

  ngOnInit(): void {
    this.InventoryItems = new MatTableDataSource<InventoryItem>(this.inventoryListMock.getData());
    this.InventoryItems.paginator = this.paginator; /*paginatorul este setat la data source*/
    this.InventoryItems.sort = this.sort; /*sortarea este setata la data source*/
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.InventoryItems.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.InventoryItems.data.forEach((row: Element) =>
          this.selection.select(row),
        ); /* daca nu sunt selectate, le selectam pe toate */
  }
}
