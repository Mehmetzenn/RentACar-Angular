import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LocaleStorageService } from './local-storage.service';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:7220/api/auth/";
  jwtHelper=new JwtHelperService();

  constructor(private httpClient:HttpClient, private localStorage:LocaleStorageService) { }

  login(login:LoginModel)
  {
    let newPath= this.apiUrl+"login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,login);
  }

  getUserInfo(token: string){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token 
    });
    let newPath= this.apiUrl+"getbyid";

    return this.httpClient.get<any>(newPath, { headers: headers });
  }

  register(register:RegisterModel)
  {
    let newPath= this.apiUrl+"register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,register);
  }
  getUserName():string | null{

   const token=this.getToken();
   if(token){
    const decodedToken=this.jwtHelper.decodeToken(token)
    return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || null;
    }
    return null;
  }
  getUserDetail()
  {
    const token=this.getToken();
    if(token){
     const decodedToken=this.jwtHelper.decodeToken(token)
     return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
     }
     return null;
  }
  logout():void
  {
    this.localStorage.remove('token')
    this.localStorage.remove('firstName')

  }
  isAuthanticated(){
    if(localStorage.getItem("token")!=null){
      return true;
    }
    else{
      return false;
    }
  }
  private getToken()
  {
    return this.localStorage.getItem("token")
  }
  getUser()
  {
    let token= this.getToken();
  }

  isAdmin(): boolean {
    const token = this.getToken();  
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token); 
      const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]; 
  

      if (Array.isArray(roles)) {
        return roles.includes('admin');
      } else {

        return roles === 'admin';
      }
    }
    return false; 
  }

  getUserById(): Observable<SingleResponseModel<User>> {
    const token = this.getToken();
    if (token) {
      const userId = this.getUserDetail();
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      let newPath = 'https://localhost:7220/api/Users/getbyuserid?userId=' + userId; 
      return this.httpClient.get<SingleResponseModel<User>>(newPath, { headers: headers });
    }
    return null; 
  }
  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      return userId ? Number(userId) : null; 
    }
    return null;
  }
}

