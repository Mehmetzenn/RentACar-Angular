import { SingleResponseModel } from './../models/singleResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/carDetail';


@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl="https://localhost:7220/api/"
  constructor(private httpClient:HttpClient) { }

  getCarsDetailByCar(carId:number):Observable<SingleResponseModel<CarDetail>>
  {
    let newPath=this.apiUrl+"Cars/getcardetailsid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  
  }
    
  getCarsDetail():Observable<ListResponseModel<CarDetail>>
  {
    let newPath=this.apiUrl+ "Cars/GetCarDetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
