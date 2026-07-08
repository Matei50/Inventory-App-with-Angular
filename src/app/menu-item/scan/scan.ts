import { Component } from '@angular/core';
import { ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan',
  standalone: false,
  templateUrl: './scan.html',
  styleUrl: './scan.css',
})
export class Scan {
  constructor(private router: Router) {}

  public onEvent(event: ScannerQRCodeResult[], action: any): void {
    console.log('QR Code Scanner result:', event[0].value);
    this.router.navigate(['/show-item/', event[0].value]);
  }
}
