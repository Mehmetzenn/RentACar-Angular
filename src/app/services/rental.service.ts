import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService implements OnInit {
  
  apiUrl ="https://localhost:7220/api/"
  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    
  }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentaldetaildto";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  checkRentalCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/checkrentalcarid?carId="+ carId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }


  
}
