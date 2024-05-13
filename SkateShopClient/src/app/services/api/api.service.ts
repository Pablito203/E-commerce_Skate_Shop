import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static url = 'https://bfxslp84-7170.brs.devtunnels.ms/api/';
  // static url = 'https://localhost:7170/api/';

  constructor() { }
}
