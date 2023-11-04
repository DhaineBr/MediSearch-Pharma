import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserCredentials } from 'src/app/shared/models/user-credentials';
import { UserDetails } from 'src/app/shared/models/user-details';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:7000/api/auth';
  constructor(private http: HttpClient) { }

  public login(data: UserCredentials): Observable<{ authToken: string, user: UserDetails }> {
    return this.http.post<{ authToken: string, user: UserDetails }>(`${this.url}/login`, data).pipe(
      catchError((error) => {
        return throwError(error);
      }
      ));
  }

  public getProfile(): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.url}/me`);
  }
}
