import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Order } from 'src/app/shared/models/orders';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  reservations: Order[] = [];
  filteredReservations: Order[] = [];

  upcomingTransactionsCount: number = 10;
  fulfilledTransactionsCount: number = 0;
  cancelledTransactionsCount: number = 1;

  searchQuery: string = '';
  constructor(public dialog: MatDialog, private _orders : OrdersService) {}

  ngOnInit(): void {
    this.getAllOrders();
    this.filteredReservations = this.reservations;
  }


  getAllOrders() {
    this._orders.getAllOrders().subscribe((response) => {
      this.reservations = Array.isArray(response) ? response : [response];
      console.log(this.reservations);
    });
  }




  filterReservations() {
    this.filteredReservations = this.reservations.filter((reservation) =>
      reservation.userId
    );
  }


  reservationDetails() {
    const dialogRef = this.dialog.open(ReservationDetailsComponent, {
      width: '30%',
      height: 'auto',
    });

  }

  }

