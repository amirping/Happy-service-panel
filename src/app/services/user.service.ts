import { Injectable } from '@angular/core';
import { User } from '../class/user';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {
  private userapiurl = 'http://localhost:3000/api/user';

  constructor(private _http: HttpClient) { }
  token = localStorage.getItem('token');
  // current user token
  public updateUser_security(old_password: string, new_password: string) {
    // update password
    const data = {
      old_password : old_password,
      new_password : new_password,
      token: this.token
    };
    return this._http.put(this.userapiurl, data);
  }
  /**
   * getUser
   */
  public getUser() {
    // use token for that
    let param = new HttpParams().set('token', this.token);
    return this._http.get(this.userapiurl, { params: param});
  }
  public updateUser_personel(user: User) {
    const data = {
      name : user.$name,
      last_name : user.$last_name,
      resto_name : user.$resto_name,
      token : this.token
    };
    return this._http.patch(this.userapiurl, data);
  }

}
