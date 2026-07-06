import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InventoryListMock } from '../../app-logic/inventory-list-mock';
import {
  Router,
  ActivatedRoute,
} from '@angular/router'; /* activated route ia ruta curenta si extrage nr trimis*/
import { InventoryItem } from '../../app-logic/inventory-item';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  standalone: false,
  templateUrl: './add-item.html',
  styleUrl: './add-item.css',
})
export class AddItem implements OnInit {
  addItemForm: FormGroup;
  item!: InventoryItem;
  /*  cand dam click pe edit vrem sa stim despre ce id e vb*/
  itemId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private inventoryListMock: InventoryListMock,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.addItemForm = this.formBuilder.group({});
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.itemId = params['id'];
      } else {
        this.itemId = 0;
      }
    });
  }

  ngOnInit(): void {
    this.item =
      this.itemId == 0 ? new InventoryItem() : this.inventoryListMock.getItemById(this.itemId);

    // this.addItemForm = this.formBuilder.group({
    //   name: [this.item.name, Validators.required],
    //   user: [this.item.user, Validators.required],
    //   description: [this.item.description, Validators.maxLength(100)],
    //   location: [this.item.location, Validators.required],
    //   inventoryNumber: [this.item.inventoryNumber, Validators.required],
    //   createdAt: [this.item.createdAt?.toISOString().split('T')[0], Validators.required],
    // });
    this.addItemForm = this.formBuilder.group({
      name: [''],
      description: [''],
      user: [''],
      location: [''],
      inventoryNumber: [0],
      createdAt: [''],
    });

    // 2. Verificăm dacă suntem în modul Editare (dacă avem un ID)
    if (this.itemId && this.itemId !== 0) {
      // PASUL LIPSĂ: Cerem lista de produse și îl căutăm pe cel care ne interesează
      const toateProdusele = this.inventoryListMock.getData();

      // Căutăm produsul (folosim == în loc de === pentru că din URL ID-ul vine ca text, ex: "1005")
      const produsGasit = toateProdusele.find((p) => p.id == this.itemId);

      // 3. Dacă am găsit produsul în lista mock, îl salvăm și populăm formularul
      if (produsGasit) {
        this.item = produsGasit; // Salvăm produsul în variabila clasei

        this.addItemForm.patchValue({
          name: this.item.name,
          description: this.item.description,
          user: this.item.user,
          location: this.item.location,
          inventoryNumber: this.item.inventoryNumber,
          createdAt: this.item.createdAt,
        });
      }
    }
  }

  onSubmit() {
    if (this.itemId == 0) {
      this.item = new InventoryItem(this.addItemForm.value);
      this.item.createdAt = new Date(this.item.createdAt);
      this.item.modifiedAt = new Date();
      this.item.deleted = false;
      this.item.id = this.inventoryListMock.getLastId() + 1;
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

  public hasError(controlName: string, errorName: string): boolean {
    return this.addItemForm.controls[controlName].hasError(errorName);
  }
}
