import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  apiUrl="https://localhost:7220/api/"

  constructor(private httpClient:HttpClient) { }

  pay(payment:Payment):Observable<Response>{
    let newPath = this.apiUrl + "/api/Payments/pay"
    return this.httpClient.post<Response>(newPath,payment)
  }
}
