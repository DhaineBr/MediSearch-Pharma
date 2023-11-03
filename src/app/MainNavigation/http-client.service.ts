import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor() {}

  public baseURL: string = 'http://localhost:6565/api';

  public get request() {
    return axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  public postData(data: any) {
    return this.request.post(`${this.baseURL}/auth/login`, data);
  }
  public registerData(data: any) {
    return this.request.post(`${this.baseURL}/auth/register`, data);
  }



  //Dashboard module

  //Map module
}
