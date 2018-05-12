import { Component, OnInit, Input } from '@angular/core';
import { Reservation } from '../class/reservation';
import { RtEvent } from '../class/rt-event';
import { RtSocketService } from '../services/rt-socket.service';
import { MatSnackBar } from '@angular/material';
import { ReservationService } from '../services/reservation.service';
const SERVER_URL = 'https://23d7da96.ngrok.io';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  @Input('showType') showType: String;
  @Input('mangeReservation') mangeReservation: Boolean;
  reservation_list: Array<Reservation> = [];
  ioConnection: any;
  isConnected: Boolean = false;
  constructor(private _rtSocket: RtSocketService, public snackBar: MatSnackBar, private _reservationService: ReservationService) { }

  ngOnInit() {
    this.initIoConnection();
  }
  private initIoConnection(): void {
    // this._rtSocket.initSocket();
    this._rtSocket.send('hello reservation');
    this._rtSocket.onMessage()
      .subscribe((message: any) => {
        console.log('from reservation');
      });
    this._rtSocket.onGetReservation()
      .subscribe((reservation: any) => {
        console.log('we got new reservation');
        console.log(reservation);
        // let e = new Order(order.user, order.sessionId, order.order_stat, order.order_items, order.order_timestamp, order._id);
        const e = new Reservation(reservation.user, reservation.sessionId, reservation.reservation_stat,
          reservation.reservation_date, reservation.reservation_time, reservation.reservation_timestamp, reservation._id);
        this.reservation_list.push(e);
        // play notif sound
        this.notify('neworder');
      });

    this._rtSocket.onGetUpdate()
      .subscribe((data: any) => {
        const update_reservation = data['update_reservation'];
        if (update_reservation.length === 0) {
          this.reservation_list = [];
        }
        this.reservation_list = [];
        update_reservation.forEach(reservation => {
          console.log(reservation);
          const e = new Reservation(reservation.user, reservation.sessionId, reservation.reservation_stat,
            reservation.reservation_date, reservation.reservation_time, reservation.reservation_timestamp, reservation._id);
          this.reservation_list.push(e);
        });
      });

    this._rtSocket.onCancelReservation()
      .subscribe((data: any) => {
        console.log(data);
        this.reservation_list.forEach(reservation => {
          if (reservation.$reservationId === data) {
            // alert user to cancel
            this.openSnackBar('client cancel order #' + reservation.$reservation_db_id + ' !! ', 'i got it');
            // chnage flag
            reservation.$reservationStat = -1;
          }
        });
      });

    this._rtSocket.onEvent(RtEvent.CONNECT)
      .subscribe(() => {
        console.log('RT connected');
        this.isConnected = true;
        this.notify('connected');
      });

    this._rtSocket.onEvent(RtEvent.DISCONNECT)
      .subscribe(() => {
        console.log('RT disconnected');
        this.isConnected = false;
        this.notify('disconnect');
      });
  }
  notify(TYPE) {
    const audio = new Audio();
    switch (TYPE) {
      case 'neworder':
        audio.src = './assets/your-turn.mp3';
        break;
      case 'connected':
        audio.src = './assets/communication-channel.mp3';
        break;
      case 'disconnect':
        audio.src = './assets/case-closed.mp3';
        break;
      default:
        console.log('not supported type');
        break;
    }
    audio.load();
    audio.play();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 9000,
    });
  }
  removeReservation(ev, sessionId) {
    const t_list = this.reservation_list;
    this.reservation_list.forEach(function (element, i) {
      if (element.$reservationId === sessionId) {
        t_list.splice(i, 1);
        return;
      }
    });
  }
  /**
   * acceptReservation
   */
  public acceptReservation(reservationId: string, sessionId: string) {
    this._reservationService.updateReservation(reservationId, 2).subscribe((data) => {
      this._rtSocket.ReservationSendAction(reservationId, sessionId, 'AcceptReservation');
      this.reservation_list.forEach(element => {
        if (element.$reservation_db_id === reservationId) {
          element.$reservationStat = 2;
        }
      });
    }, err => {
      console.log(err);
    });
  }
  /**
   * rejectReservation
   */
  public rejectReservation(reservationId: string, sessionId: string) {
    this._reservationService.updateReservation(reservationId, -2).subscribe((data) => {
      this._rtSocket.ReservationSendAction(reservationId, sessionId, 'RejectReservation');
      this.reservation_list.forEach(element => {
        if (element.$reservation_db_id === reservationId) {
          element.$reservationStat = -2;
        }
      });
    }, err => {
      console.log(err);
    });
  }
}
