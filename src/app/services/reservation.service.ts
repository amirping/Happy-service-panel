import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReservationService {
  private domain = 'http://localhost:3000/api/reservation';
  constructor(private _http: HttpClient) { }

  /**
   * getReservation
   */
  public getReservation (reservationId?: string) {
    return new Observable(observer => {
      if (reservationId && reservationId.length > 5) {
        observer.next(this._http.get(this.domain + '/' + reservationId));
      } else {
        observer.next(this._http.get(this.domain));
      }
    });
  }

  /**
   * updateReservation
   */
  public updateReservation(reservationId: string, reservationStat: Number) {
    return this._http.patch(this.domain + '/' + reservationId, { 'reservationStat': reservationStat });
  }

}
