import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserCredentials } from 'src/app/shared/models/user-credentials';
import { UserDetails } from 'src/app/shared/models/user-details';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public login(data: UserCredentials): Observable<{ authToken: string, user: UserDetails }> {
    return this.http.post<{ authToken: string, user: UserDetails }>(`${environment.apiProdURL}/auth/login`, data).pipe(
      catchError((error) => {
        return throwError(error);
      }
      ));
  }

  public getProfile(): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${environment.apiProdURL}/auth/my-profile`);
  }
}
