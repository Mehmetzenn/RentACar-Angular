import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:7220/api/"
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + "colors/getall")
  }

  getByColorId(colorId:number):Observable<SingleResponseModel<Color>>{
    return this.httpClient.get<SingleResponseModel<Color>>(this.apiUrl + "colors/getbycolorid?colorId=" + colorId)
  }

  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/add",color)
  }
  update(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/update",color)
  }
}
