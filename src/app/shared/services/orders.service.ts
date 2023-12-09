import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Order } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orderUrl = '/customer-orders';
  constructor(private http: HttpClient) { }

  public getAllOrders(): Observable<Order> {
    return this.http.get<Order>(`${environment.apiProdURL}${this.orderUrl}`);
  }
}
