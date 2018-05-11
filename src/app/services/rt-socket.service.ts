import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as socketIo from 'socket.io-client';
import { RtEvent } from '../class/rt-event';
import { Order } from '../class/order';
import { Reservation } from '../class/reservation';
const SERVER_URL = 'https://65ce402e.ngrok.io';
@Injectable()
// tslint:disable-next-line:class-name
export class RtSocketService {

  private socket;

  constructor() { }

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(message): void {
    this.socket.emit('message', message);
  }

  /**
   * orderSendAction
   */
  public orderSendAction(orderid: string, sessionId: string, action: string) {
    this.socket.emit(action, { 'orderId': orderid, 'seesionId': sessionId });
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data: any) => observer.next(data));
    });
  }

  public onGetOrder(): Observable<Order> {
    return new Observable<Order>(observer => {
      this.socket.on('getOrder', (data: Order) => observer.next(data));
    });
  }

  public onGetUpdate(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('getUpdate', (data: any) => observer.next(data));
    });
  }

  public onCancelOrder(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('cancelOrder', (data: any) => observer.next(data));
    });
  }

  // note : change any to reservation type after create reservation class
  public onGetReservation(): Observable<Reservation> {
    return new Observable<Reservation>(observer => {
      this.socket.on('getReservation', (data: Reservation) => observer.next(data));
    });
  }

  public onCancelReservation(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('cancelReservation', (data: any) => observer.next(data));
    });
  }

  /**
  * ReservationSendAction
  */
  public ReservationSendAction(reservationid: string, sessionId: string, action: string) {
    this.socket.emit(action, { 'reservationId': reservationid, 'seesionId': sessionId });
  }

  public onEvent(event: RtEvent): Observable<any> {
    return new Observable<RtEvent>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
