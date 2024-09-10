import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/response';
import { SingleResponseModel } from '../models/singleResponseModel';
import { RentalAdd } from '../models/rentalAdd';

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

  add(rental:RentalAdd):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"rentals/add",rental)
  }

  update(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"rentals/update",rental)
  }

  getByRentalId(rentalId:number):Observable<SingleResponseModel<Rental>>{
    return this.httpClient.get<SingleResponseModel<Rental>>(this.apiUrl + "rentals/getbyid?id=" + rentalId)
  }
}
