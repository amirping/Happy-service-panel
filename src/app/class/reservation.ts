import { Time } from '@angular/common';

export class Reservation {
    private user: any;
    private reservationId: String;
    private reservationStat: Number;
    private reservation_date: Date;
    private reservation_time: Time;
    private reservation_db_id: String;
    constructor($user: any, $reservationId: String,
        $reservationStat: Number, $reservation_date: Date, $reservation_time: Time,
        $reservation_db_id?: String) {
        this.user = $user;
        this.reservationId = $reservationId;
        this.reservationStat = $reservationStat;
        this.reservation_date = $reservation_date;
        this.reservation_time = $reservation_time;
        if (this.reservation_db_id) {
            this.reservation_db_id = $reservation_db_id;
        } else {
            this.reservation_db_id = '-1';
        }
    }

    /**
     * Getter $user
     * @return {any}
     */
    public get $user(): any {
        return this.user;
    }

    /**
     * Getter $reservationId
     * @return {String}
     */
    public get $reservationId(): String {
        return this.reservationId;
    }

    /**
     * Getter $reservationStat
     * @return {Number}
     */
    public get $reservationStat(): Number {
        return this.reservationStat;
    }

    /**
     * Getter $reservation_date
     * @return {Date}
     */
    public get $reservation_date(): Date {
        return this.reservation_date;
    }

    /**
     * Getter $reservation_time
     * @return {Time}
     */
    public get $reservation_time(): Time {
        return this.reservation_time;
    }

    /**
     * Getter $reservation_db_id
     * @return {String}
     */
    public get $reservation_db_id(): String {
        return this.reservation_db_id;
    }

    /**
     * Setter $user
     * @param {any} value
     */
    public set $user(value: any) {
        this.user = value;
    }

    /**
     * Setter $reservationId
     * @param {String} value
     */
    public set $reservationId(value: String) {
        this.reservationId = value;
    }

    /**
     * Setter $reservationStat
     * @param {Number} value
     */
    public set $reservationStat(value: Number) {
        this.reservationStat = value;
    }

    /**
     * Setter $reservation_date
     * @param {Date} value
     */
    public set $reservation_date(value: Date) {
        this.reservation_date = value;
    }

    /**
     * Setter $reservation_time
     * @param {Time} value
     */
    public set $reservation_time(value: Time) {
        this.reservation_time = value;
    }

    /**
     * Setter $reservation_db_id
     * @param {String} value
     */
    public set $reservation_db_id(value: String) {
        this.reservation_db_id = value;
    }


}
