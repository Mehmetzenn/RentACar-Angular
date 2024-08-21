import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleStorageService {

  constructor(private httpClient:HttpClient) { }


  getItem(key:string)
  {
    return localStorage.getItem(key);
  }
  setItem(key:string,value:string)
  {
    return localStorage.setItem(key,value);
  }
  remove(key:string)
  {
    return localStorage.removeItem(key);
  }
  removeAll(){
    localStorage.clear();
  }
}