import { Component, OnInit } from '@angular/core';
import { Reservation } from '../class/reservation';
import { Order } from '../class/order';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material';
import { Time } from '@angular/common';
import { ReservationService } from '../services/reservation.service';


@Component({
  selector: 'app-full-log',
  templateUrl: './full-log.component.html',
  styleUrls: ['./full-log.component.css']
})
export class FullLogComponent implements OnInit {
  displayedColumns = ['reservation_db_id', 'user', 'reservation_time', 'reservation_date'];
  reservation_log: Reservation[] = [];
  order_log: Order[];
  dataSource_reservation = new MatTableDataSource(this.reservation_log);
  dataSource_order = new MatTableDataSource(this.order_log);
  constructor(private _reservationService: ReservationService) {
    this._reservationService.getReservation().subscribe((data) => {
      console.log(data);
      
      if (data['ok'] === true) {
        let reservations = data['data'];
        reservations.forEach(reservation => {
          const e = new Reservation(reservation.user, reservation.sessionId, reservation.reservation_stat,
            reservation.reservation_date, reservation.reservation_time, reservation.reservation_timestamp, reservation._id);
          this.reservation_log.push(e);
        });
        this.dataSource_reservation = new MatTableDataSource(this.reservation_log);
      }
    }, err => {

    });
  }

  ngOnInit() {
  }

}
