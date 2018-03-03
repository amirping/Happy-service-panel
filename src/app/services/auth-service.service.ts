import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthServiceService {
  loginUrl = "http://localhost:3000/api/user"; // -> preformed with POST
  tokenApi = "http://localhost:3000/api/token";
  data = {};
  httpOptions = {};

  constructor(private http: HttpClient) { }
  login(pseudo: string, password: string) {
    if (pseudo.length != 0 && pseudo != null && password.length != 0 && password != null) {
      let data = {
        pass: password,
        pseudo: pseudo
      };
      return this.http.post(this.loginUrl, data);
    }
  }

  public setSession(authResult) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem("created_at", authResult.created_at);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("created_at");
  }

  public isLoggedIn() {
    // check if token existe and equal as the same last one in db
  }

  public isAuthenticated() {
    const token = localStorage.getItem('token');
    const date = localStorage.getItem('created_at');
    // send to api
    // for test return true
    if (token === null) {
      return false
    }
    return true;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

}
