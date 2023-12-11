import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Order } from 'src/app/shared/models/orders';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit{
  orderHistory: Order[] = [];

  constructor(private _orders : OrdersService) {}


  searchQuery: string = '';

  ngOnInit(): void {
    this.getAllOrders()
  }


  getAllOrders() {
    this._orders.getAllOrders().subscribe((response) => {
      this.orderHistory = Array.isArray(response) ? response : [response];
      console.log(this.orderHistory);
    });
  }
}
