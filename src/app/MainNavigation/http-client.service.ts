import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import axios from 'axios';


@Injectable({
  providedIn: 'root',
})
export class HttpClientService {

  public baseURL: string = 'http://localhost:7000/api';

  constructor(private http : HttpClient) {}

  public login( email : string, password: string ): Observable<any> {
    return this.http.post<any>(this.baseURL.concat('/auth/login'), {
        email: email,
        password: password,
    }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  //Dashboard module

  //Map module
}
