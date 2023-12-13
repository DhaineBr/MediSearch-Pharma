import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/shared/models/medicine';
import { MedicineService } from 'src/app/shared/services/medicine.service';
import { Order } from 'src/app/shared/models/orders';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  medicines: Medicine[] = [];
  orders: Order[] = [];

  constructor(private _medicines : MedicineService,
    private _reservations : OrdersService){  }

  ngOnInit(): void {
    this.getAllOrders()
    this.getAllMedicines();
  }

  getAllMedicines() {
    this._medicines.getAllMedicines().subscribe((response) => {
      this.medicines = Array.isArray(response) ? response : [response];
    });
  }

  getAllOrders() {
    this._reservations.getAllOrders().subscribe((response) => {
      this.orders = Array.isArray(response) ? response : [response];
      console.log(this.orders);
    });
  }

  isReserved(isReservation: boolean){
    return isReservation == true;
  }

  isNotFulfilled(isFulfilled: boolean){
    return isFulfilled == false;
  }

  getReservationsCount(): number {
    return this.orders.filter((medicine) =>
    this.isReserved(medicine.isReservation) &&
    this.isNotFulfilled(medicine.isFulfilled)
  ).length;
  }

  isLowStock(quantity: number): boolean {
    return quantity < 25;
  }

  getLowStock(): number {
    return this.medicines.filter((medicine) =>
      this.isLowStock(medicine.quantity)
    ).length;
  }

  isExpired(expirationDate: Date): boolean {
    const currentDate = new Date();
    return expirationDate < currentDate;
  }

  getExpiredCount(): number {
    return this.medicines.filter((medicine) =>
      this.isExpired(new Date(medicine.expirationDate))
    ).length;
  }

  isExpiringWithinMonth(expirationDate: Date): boolean {
    const currentDate = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(currentDate.getMonth() + 1);

    return expirationDate >= currentDate && expirationDate <= nextMonth;
  }

  getExpiringWithinMonth(): Medicine[] {
    return this.medicines.filter((medicine) =>
      this.isExpiringWithinMonth(new Date(medicine.expirationDate))
    );
  }




}
