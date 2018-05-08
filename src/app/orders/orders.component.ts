import { Component, OnInit, Input, Inject } from '@angular/core';
import { Order } from '../class/order';
import { OrderItems } from '../class/order-items';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { RtSocketService } from '../services/rt-socket.service';
import { RtEvent } from '../class/rt-event';
const SERVER_URL = 'https://a522264b.ngrok.io';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @Input('showType') showType: String;
  @Input('mangeOrder') mangeOrder: Boolean;
  order_list: Array<Order> = [];
  ioConnection: any;
  isConnected: Boolean = false;
  constructor(private _http: HttpClient, public dialog: MatDialog, private _rtSocket: RtSocketService, public snackBar: MatSnackBar) {
    const time = Date.now();
    const e1 = new OrderItems('makloub escalop', 2, 'large', '55661161', 'xD you are so funny dude,ok since im hungry,i think \
    i want 2 large makloub escalop');
    const e2 = new OrderItems('Coca', 2, 'big', '55661161', 'i think i will need also 2 big coca-cola ');
    const o1 = new Order('facebook : monkey de Lofy', '5548556', 1, [e1, e2], Number.parseInt(time + ''));
    const o2 = new Order('Slack: Black Sworeded', '477742266', 1, [e1, e2], time);
    // this.order_list.push(o1, o2);
    // if type === current get only from socket
    // if type === fulllog get all from socket + db
    // if mangeOrder === true ,  allow the user to manager the orders
  }

  ngOnInit() {
    this.initIoConnection();
  }

  showInfo(order_item: OrderItems): void {
    const dialogRef = this.dialog.open(OrderItemInfoComponent, {
      width: '600px',
      data: { order_item: order_item }
    });
  }

  private initIoConnection(): void {
    this._rtSocket.initSocket();

    this._rtSocket.onMessage()
      .subscribe((message: any) => {
        console.log(message);
      });

    this._rtSocket.onGetOrder()
      .subscribe((order: any) => {
        console.log('we got new order');
        console.log(order);
        let e = new Order(order.user, order.sessionId, order.order_stat, order.order_items, order.order_timestamp);
        this.order_list.push(e);
        // play notif sound
        this.notify('neworder');
      });

    this._rtSocket.onGetUpdate()
      .subscribe((data: any) => {
        // have multi data type 
        /*
         order on server memory 
         current user number 
         life session 
         etc ...
         */
        const update_orders = data['update_order'];
        update_orders.forEach(order => {
          let e = new Order(order.user, order.sessionId, order.order_stat, order.order_items, order.order_timestamp);
          this.order_list.push(e);
        });
      });

    this._rtSocket.onCancelOrder()
      .subscribe((data: any) => {
        console.log(data);
        this.order_list.forEach(order => {
          if (order.$orderId === data) {
            // alert user to cancel 
            this.openSnackBar('client cancel order #' + data + ' !! ', 'i got it');
            // chnage flag
            order.$orderStat = -1;
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
  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this._rtSocket.send({
      content: message
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
  removeOrder(ev, sessionId) {
    let t_list = this.order_list;
    this.order_list.forEach(function(element, i) {
      if (element.$orderId === sessionId) {
        t_list.splice(i, 1);
        return ;
      }
    });
  }

}
/**
 * Dialog to show each item data
 */
@Component({
  selector: 'app-order-item-info',
  templateUrl: './order-item-info.html',
  styleUrls: ['./order-item-info.component.css']
})
export class OrderItemInfoComponent {

  constructor(
    public dialogRef: MatDialogRef<OrderItemInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
