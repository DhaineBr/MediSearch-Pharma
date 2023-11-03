import { Component, OnInit } from '@angular/core';

interface Reservation {
  orderId: number;
  name: string;
  order: string;
  contactNo: string;
  dateTime: string;
  totalPrice: number;
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];

  upcomingTransactionsCount: number = 10;
  fulfilledTransactionsCount: number = 0;
  cancelledTransactionsCount: number = 1;

  searchQuery: string = '';

  constructor() { }

  ngOnInit(): void {
    // You can update these counts based on your data or API calls.
    // For now, we have set them to static values for demonstration purposes.
    this.fetchTransactionCounts();

    // Generate dummy data for reservations
    this.reservations = this.generateDummyData(10);
    this.filteredReservations = this.reservations;
  }

  // Simulate fetching transaction counts from an API
  fetchTransactionCounts() {
    // Here, you can make API calls or use any logic to fetch the transaction counts.
    // For demonstration purposes, we'll update the counts after a timeout to simulate API calls.
    setTimeout(() => {
      this.upcomingTransactionsCount = 20;
      this.fulfilledTransactionsCount = 8;
      this.cancelledTransactionsCount = 3;
    }, 2000); // Simulate a 2-second delay before updating the counts.
  }

  // Generate dummy data for reservations
  generateDummyData(count: number): Reservation[] {
    const dummyReservations: Reservation[] = [];

    for (let i = 1; i <= count; i++) {
      const reservation: Reservation = {
        orderId: 1000 + i,
        name: `Customer ${i}`,
        order: `Order ${i}`,
        contactNo: `09123456789${i}`,
        dateTime: `01/01/2024 | 0${i}:00`,
        totalPrice: i * 100
      };

      dummyReservations.push(reservation);
    }

    return dummyReservations;
  }

  // Filter reservations based on the search query
  filterReservations() {
    this.filteredReservations = this.reservations.filter((reservation) =>
      reservation.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
