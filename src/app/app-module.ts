import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RoutingComponents } from './app-routing-module';
import { App } from './app';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
/* se pot pune mai multe sau o singura componenta intr un modul */
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/select';
import { QrCodeComponent } from 'ng-qrcode';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { ShowItem } from './menu-item/show-item/show-item';

@NgModule({
  declarations: [App, RoutingComponents, ShowItem],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    QrCodeComponent,
    NgxScannerQrcodeModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
