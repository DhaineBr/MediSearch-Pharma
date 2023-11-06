import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';

import { MainNavigationRoutingModule } from './main-navigation-routing.module';
import { MainNavigationComponent } from './main-navigation.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { ArchiveComponent } from './archive/archive.component';
import { FormsModule } from '@angular/forms';
import { AddMedicineComponent } from './inventory/add-medicine/add-medicine.component';
import { EditMedicineComponent } from './inventory/edit-medicine/edit-medicine.component';
import { StoreDetailsComponent } from './settings/store-details/store-details.component';
import { AccountDetailsComponent } from './settings/account-details/account-details.component';
import { RestoreItemsComponent } from './archive/restore-items/restore-items.component';
import { PermanentlyDeleteComponent } from './archive/permanently-delete/permanently-delete.component';
import { ReservationDetailsComponent } from './reservations/reservation-details/reservation-details.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpBaseInterceptor } from 'src/app/shared/interceptors/http-base.interceptor';

@NgModule({
  declarations: [
    MainNavigationComponent,
    InventoryComponent,
    ReservationsComponent,
    HomeComponent,
    HistoryComponent,
    SettingsComponent,
    ArchiveComponent,
    AddMedicineComponent,
    EditMedicineComponent,
    StoreDetailsComponent,
    AccountDetailsComponent,
    RestoreItemsComponent,
    PermanentlyDeleteComponent,
    ReservationDetailsComponent
  ],
  imports: [
    CommonModule,
    MainNavigationRoutingModule,
    FormsModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  providers: [

  ]
})
export class MainNavigationModule { }
