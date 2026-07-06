import { Injectable } from '@angular/core';
import { ContactData } from './contact-data';

// @Service()
// export class ContactProvider {
//   getContactData(): ContactData {
//    return this.providedData;
//   }
// }

@Injectable({
  providedIn: 'root',
})
export class ContactProvider {
  providedData = <ContactData>{
    info: 'We are a leading provider of inventory management solutions, dedicated to helping businesses streamline their operations and maximize efficiency.',
    phone: '+1 (555) 123-4567',
    openDays: 'Monday - Friday',
    timeSlots: '9:00 AM - 5:00 PM',
    address: '123 Inventory St, Business City, BC 12345',
  };

  getContactData(): ContactData {
    return this.providedData;
  }
}
