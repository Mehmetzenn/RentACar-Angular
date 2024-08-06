import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.';
import { ResponseModel } from '../models/response';
import { CarDetail } from '../models/carDetail';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:7220/api/"

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "Cars/getallbybrand?id=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "Cars/getallbycolor?id="+ colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  
  getCarsByColorAndBrand(brandId:number,colorId:number){
    let newPath = this.apiUrl + "Cars/getallbycolorandbrand?brandId=" + brandId +"&colorId=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarsById(carId:number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl+"cars/getbyid?id=" + carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsDetailsId(carDetailId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath =this.apiUrl+"cars/getcardetailsid?carId="+carDetailId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }


  getCarsDetail():Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+ "Cars/GetCarDetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "Cars/add", car)
  }
  
  delete(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/delete", car)
  }
  
  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/update", car)
  }
}
