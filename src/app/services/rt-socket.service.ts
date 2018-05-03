import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as socketIo from 'socket.io-client';
import { RtEvent } from '../class/rt-event';
import { Order } from '../class/order';
const SERVER_URL = 'https://a522264b.ngrok.io';
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

  public onCancelOrder(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('cancelOrder', (data: any) => observer.next(data));
    });
  }

  // note : change any to reservation type after create reservation class
  public onGetReservation(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('getReservation', (data: any) => observer.next(data));
    });
  }

  public onCancelReservation(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('cancelReservation', (data: any) => observer.next(data));
    });
  }

  public onEvent(event: RtEvent): Observable<any> {
    return new Observable<RtEvent>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
