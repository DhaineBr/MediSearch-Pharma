import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Pharmacy } from '../models/pharmacy';
@Injectable({
  providedIn: 'root'
})

export class PharmacyService {
  url='pharmacies';
  constructor(private http: HttpClient) { }

  public getAllPharmacies() {
    return this.http.get(`${environment.apiProdURL}/pharmacies`);
  }

  public getPharmacyById(data: any) {
    return this.http.get(`${environment.apiProdURL}/pharmacies/${data.id}`);
  }

  public createPharmacy(data: any) {
    return this.http.post(`${environment.apiProdURL}/pharmacies/branch/register`, data);
  }

  public getallorders(data: any ){
    return this.http.get(`${environment.apiProdURL}/`, data)
  }
}
