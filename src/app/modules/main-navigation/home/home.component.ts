import { Component } from '@angular/core';

interface Pharmacy  {
  rank: number;
  pharmacyName: string;
  pharmacyAddress: number;
  rating: string
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
        rank: 891341 + i,
        pharmacyName: `Seretide 250 Diskus`,
        pharmacyAddress: 12 + i ,
        rating: `12/07/2023`
      };

      dummyPharmacy.push(pharmacy);
    }

    return dummyPharmacy;
  }



}
