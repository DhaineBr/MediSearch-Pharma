import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class PharmacyService {
  constructor(private http: HttpClient) { }

  public getAllPharmacies() {
    return this.http.get(`${environment.apiProdURL}/pharmacy`);
  }



  public createPharmacy(data: any) {
    return this.http.post(`${environment.apiProdURL}`, data);
  }

  public getallorders(data: any ){
    return this.http.get(`${environment.apiProdURL}/`, data)
  }
}
