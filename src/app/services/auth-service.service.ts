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

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("created_at");
  }

  public isLoggedIn() {
    // check if token existe and equal as the same last one in db
  }

  public isAuthenticated() {
    const token = localStorage.getItem('token');
    const date = localStorage.getItem('created_at');
    let promise;
    // send to api
    // for test return true
    console.log("what he gonna say ... !")
    console.log("i will return soon")
      if (token === null || date === null) {
        console.log("resolving False")
        promise = Promise.reject(false);
        return promise
      }
      else {
        // api check
        console.log("Http started to api")
        return this.http.post(this.tokenApi, { token, date }).map(res => {
          let token_stat = res['isToeknUp'];
          return token_stat
        }).toPromise();

 // ok i know that it look crasy but i make it work XD promise on http with externel resolving 
        // subscribe(res => {
        //   let token_stat = res['isToeknUp'];
        //   console.log(res);
        //   console.log("resolving result")
        //   resolve(token_stat)
        // }, err => {
        //   console.log("started here ")
        //   console.log(err);
        //   reject(err);
        // });
      }

  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

}
