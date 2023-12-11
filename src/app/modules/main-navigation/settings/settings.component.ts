import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { Pharmacy } from 'src/app/shared/models/pharmacy';
import { PharmacyService } from 'src/app/shared/services/pharmacy.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{
  pharmacy: Pharmacy={} as Pharmacy;

  constructor(public dialog: MatDialog, private _pharmacies : PharmacyService) {}


  ngOnInit(): void {

    const pharmacyId = 2;
    this.getPharmacyById(pharmacyId);
  }

  getPharmacyById(id: number) {
    this._pharmacies.getPharmacyById({ id }).subscribe((response) => {
      this.pharmacy = Array.isArray(response) ? response[2] : response;
      console.log(this.pharmacy);
    });
  }



  editStore() {
    this.dialog.open(StoreDetailsComponent, {
      width: '120vh',
      height: '67vh',
    });
  };

  editAccount() {
    this.dialog.open(AccountDetailsComponent, {
      width: '50vh',
      height: '65vh',
    });
  }


}
