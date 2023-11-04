import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  constructor(public dialog: MatDialog) {}

  editStore() {
    this.dialog.open(StoreDetailsComponent, {
      width: '120vh',
      height: '77.5vh',
    });
  };

  editAccount() {
    this.dialog.open(AccountDetailsComponent, {
      width: '50vh',
      height: '65vh',
    });
  }

}
