import { Injectable } from '@angular/core';
import { User } from '../class/user';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {
  private userapiurl = 'http://localhost:3000/api/user';

  constructor(private _http: HttpClient) { }
  token = localStorage.getItem('token');
  // current user token
  public update_personel(name: string, last_name: string, resto_name: string) {
    // update personel data
  }
  public update_security(old_password: string, new_password: string) {
    // update password
  }
  /**
   * getUser
   */
  getUser() {
    // use token for that
    let param = new HttpParams().set('token', this.token);
    return this._http.get(this.userapiurl, { params: param});
  }

}
