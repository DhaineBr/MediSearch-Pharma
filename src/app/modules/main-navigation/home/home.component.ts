import { Component } from '@angular/core';

interface Pharmacy  {
  rank: number;
  pharmacyName: string;
  pharmacyAddress: string;
  rating: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  pharmacies: Pharmacy[] = [];

  ngOnInit(): void {
    this.pharmacies = this.generateDummyData(5);
  }

  generateDummyData(count: number): Pharmacy[] {
    const dummyPharmacy: Pharmacy[] = [];

    for (let i = 1; i <= count; i++) {
      const pharmacy: Pharmacy = {
        rank: i,
        pharmacyName: `Pharmacy Name ` + i,
        pharmacyAddress: `Brgy ` + i + ` Poblacion, Batangas City`,
        rating: 5 - (i/100)
      };

      dummyPharmacy.push(pharmacy);
    }

    return dummyPharmacy;
  }



}
