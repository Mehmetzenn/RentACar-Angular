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


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:7220/api/auth/";
  //public jwtHelperService: JwtHelperService = new JwtHelperService();
  jwtHelper=new JwtHelperService();

  constructor(private httpClient:HttpClient, private localStorage:LocaleStorageService
   ) { }

  login(login:LoginModel)
  {
    let newPath= this.apiUrl+"login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,login);
  }

  getUserInfo(token: string){
    // HTTP isteği için gerekli header'ları oluşturun
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token // Tokeni Authorization header'ında gönder
    });
    let newPath= this.apiUrl+"getbyid";
    // Sunucuya HTTP GET isteği göndererek kullanıcı bilgilerini alın
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
  /*getByEmail(email:string):Observable<SingleResponseModel<User>>{

    const token=this.getToken();
   if(token){
    const decodedToken=this.jwtHelper.decodeToken(token)
    return decodedToken["email"] || null;
    }
   /* return null;
    let newPath = this.apiUrl + 'email?email='
    return this.httpClient.post<SingleResponseModel<User>>(newPath,email)
  }*/
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
    //let tokenDetails=Object.entries(jwt)
  }

}