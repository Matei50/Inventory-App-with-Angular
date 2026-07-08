import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryListMock } from '../../app-logic/inventory-list-mock';
import { InventoryItem } from '../../app-logic/inventory-item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  standalone: false,
  templateUrl: './add-item.html',
  styleUrl: './add-item.css',
})
export class AddItem {
  addItemForm: FormGroup;
  item!: InventoryItem;
  itemId!: number;
  submitValue: string = 'Add Item';

  constructor(
    private fb: FormBuilder,
    private inventoryListMock: InventoryListMock,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.addItemForm = new FormGroup({});
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.itemId = params['id'];
      } else {
        this.itemId = 0;
      }
    });
  }

  ngOnInit(): void {
    if (this.itemId == 0) {
      this.item = new InventoryItem();
      this.item.createdAt = new Date();

      this.addItemForm = this.fb.group({
        name: [this.item.name, Validators.required],
        description: [this.item.description, Validators.maxLength(100)],
        user: [this.item.user, Validators.required],
        location: [this.item.location, Validators.required],
        inventoryNumber: [this.item.inventoryNumber, Validators.required],
        createdAt: [this.item.createdAt?.toISOString().split('T')[0], Validators.required],
      });
    } else {
    }

    if (this.itemId != 0) {
      this.submitValue = 'Edit Item';
    }
  }

  onSubmit(): void {
    if (this.itemId == 0) {
      this.item = new InventoryItem(this.addItemForm.value);
      this.item.createdAt = new Date(this.item.createdAt);
      this.item.modifiedAt = new Date();
      this.item.deleted = false;
      this.inventoryListMock.addItem(this.item);
    } else {
      this.item.name = this.addItemForm.value.name;
      this.item.description = this.addItemForm.value.description;
      this.item.user = this.addItemForm.value.user;
      this.item.location = this.addItemForm.value.location;
      this.item.inventoryNumber = this.addItemForm.value.inventoryNumber;
      this.item.createdAt = new Date(this.addItemForm.value.createdAt);
      this.item.modifiedAt = new Date();
    }
    this.router.navigate(['/inventory']);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addItemForm.controls[controlName].hasError(errorName);
  };
}
