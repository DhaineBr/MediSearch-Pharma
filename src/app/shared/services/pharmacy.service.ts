import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Pharmacy } from '../models/pharmacy';
@Injectable({
  providedIn: 'root'
})
export class PharmacyService {
  url = 'pharmacies';
  constructor(private http: HttpClient) { }

  public getAllPharmacies() {
    return this.http.get(`${environment.apiProdURL}/${this.url}`);
  }

  public createPharmacy(data: Pharmacy) {
    return this.http.post(`${environment.apiProdURL}/${this.url}`, data);
  }

  public getallorders(data: any) {
    return this.http.get(`${environment.apiProdURL}/`, data)
  }
}
