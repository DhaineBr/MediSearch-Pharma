import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Medicine } from '../models/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  medUrl = '/medicines';
  constructor(private http: HttpClient) { }

  public getAllMedicines(): Observable<Medicine> {
    return this.http.get<Medicine>(`${environment.apiProdURL}${this.medUrl}`);
  }

  public createMedicine(data: Medicine) {
    return this.http.post(`${environment.apiProdURL}${this.medUrl}`, data);
  }

  public updateMedicine(data: Medicine) {
    return this.http.put(`${environment.apiProdURL}${this.medUrl}/${data.id}`, data);
  }

  public softDeleteMedicine(data: Medicine) {
    return this.http.delete(`${environment.apiProdURL}${this.medUrl}/${data.id}`);
  }

  public hardDeleteMedicine(data: Medicine) {
    return this.http.delete(`${environment.apiProdURL}${this.medUrl}/force-delete/${data.id}`);
  }
}
