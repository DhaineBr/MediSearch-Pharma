import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNavigationComponent } from './main-navigation.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { ArchiveComponent } from './archive/archive.component';


const routes: Routes = [
  {
    path: '',
    component: MainNavigationComponent,
    children: [
      { path: 'dashboard', component: HomeComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'reservations', component: ReservationsComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'archive', component: ArchiveComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainNavigationRoutingModule { }
