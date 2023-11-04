import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{
  constructor(public dialog: MatDialog) {}


  ngOnInit(): void {
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
