import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthServiceService {
  loginUrl = "http://localhost:3000/api/users";
  data = {};
  httpOptions = {};

  constructor(private http: HttpClient) { }
  login( pseudo : string , password : string  ){
    if(pseudo.length != 0 && pseudo != null && password.length != 0 && password != null){
      let data = {
        pass:password,
        pseudo:pseudo
      };
        return this.http.post(this.loginUrl,data);
    }
  }
}
