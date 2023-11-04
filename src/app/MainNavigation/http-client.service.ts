import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor() {}

  public get request() {
    return axios.create({
      baseURL: 'http://localhost:6565/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  public postData(data: any) {
    return this.request.post('http://localhost:7000/api/auth/login', data);
  }

  //Dashboard module

  //Map module
}
