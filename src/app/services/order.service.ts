import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {
  private domain = 'http://localhost:3000/api/order';
  constructor(private _http: HttpClient) { }

  /**
   * getOrder
   */
  public getOrder(orderId?: string) {
    return new Observable(observer => {
      if (orderId && orderId.length > 5) {
        observer.next(this._http.get(this.domain + '/' + orderId));
      } else {
        observer.next(this._http.get(this.domain));
      }
    });
  }

  /**
   * updateOrder
   */
  public updateOrder(orderId: string, orderStat: Number) {
    return this._http.patch(this.domain + '/' + orderId, { 'orderStat': orderStat });
  }
}
