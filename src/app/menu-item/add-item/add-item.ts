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
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.maxLength(100)],
      user: ['', Validators.required],
      location: ['', Validators.required],
      inventoryNumber: ['', Validators.required],
      createdAt: ['', Validators.required],
    });
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
      // partea de adaugare
      this.item = new InventoryItem();
      this.item.createdAt = new Date();

      this.addItemForm.patchValue({
        name: this.item.name,
        description: this.item.description,
        user: this.item.user,
        location: this.item.location,
        inventoryNumber: this.item.inventoryNumber,
        createdAt: new Date(this.item.createdAt).toISOString().split('T')[0],
      });
    } else {
      // partea de editare
      this.inventoryListMock.getItemById(this.itemId).subscribe((data) => {
        this.item = data;
        this.addItemForm.patchValue({
          name: this.item.name,
          description: this.item.description,
          user: this.item.user,
          location: this.item.location,
          inventoryNumber: this.item.inventoryNumber,
          createdAt: new Date(this.item.createdAt).toISOString().split('T')[0],
        });
      });
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
      this.inventoryListMock.updateItem(this.item);
    }
    this.router.navigate(['/inventory']);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addItemForm.controls[controlName].hasError(errorName);
  };
}
