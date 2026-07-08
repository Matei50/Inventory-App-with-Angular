import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home-page/home-page';
import { Inventory } from './menu-item/inventory/inventory';
import { Scan } from './menu-item/scan/scan';
import { AddItem } from './menu-item/add-item/add-item';
import { Contact } from './menu-item/contact/contact';
import { ShowItem } from './menu-item/show-item/show-item';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'inventory', component: Inventory },
  { path: 'scan', component: Scan },
  { path: 'add-item', component: AddItem },
  { path: 'edit/:id', component: AddItem },
  { path: 'show-item/:id', component: ShowItem },
  { path: 'contact', component: Contact },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponents = [HomePage, Inventory, Scan, AddItem, Contact, ShowItem];
