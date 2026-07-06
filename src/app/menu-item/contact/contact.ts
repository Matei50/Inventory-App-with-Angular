import { Component } from '@angular/core';
import { ContactProvider } from '../../app-logic/contact-provider';
import { ContactData } from '../../app-logic/contact-data';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactData?: ContactData;
  constructor(private contactProvider: ContactProvider) {
    this.contactData = this.contactProvider.getContactData();
  }
}
