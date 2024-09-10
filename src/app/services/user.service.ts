import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/response';
import { User } from '../models/user';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:7220/api/";

  constructor(private httpClient: HttpClient) { }

  getByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + "users/email?email=" + email)
  }

  profileUpdate(user: User): Observable<ResponseModel> {
    console.log(user)
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'users/updateprofile', {
      user: {
        'id': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'status': user.status
      },
      password: user.password
    });
  }

  getUserById(userId: number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getbyuserid?id=' + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}