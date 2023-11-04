import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {
  url = 'http://localhost:7000/api/pharmacy';
  constructor(private http: HttpClient) { }

  public getAllPharmacies() {
    return this.http.get(`${this.url}`);
  }

  public createPharmacy(data: any) {
    return this.http.post(`${this.url}`, data);
  }
}
