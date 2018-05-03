import { Component, OnInit, Input, Inject } from '@angular/core';
import { Order } from '../class/order';
import { OrderItems } from '../class/order-items';
import { HttpClient } from '@angular/common/http';
import * as socketIo from 'socket.io-client';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @Input('showType') showType: String;
  @Input('mangeOrder') mangeOrder: Boolean;
  order_list: Array<Order> = [];
  constructor(private _http: HttpClient, public dialog: MatDialog) {
    const time = Date.now();
    const e1 = new OrderItems('makloub escalop', 2, 'large', '55661161', 'xD you are so funny dude,ok since im hungry,i think i want 2 large makloub escalop');
    const e2 = new OrderItems('Coca', 2, 'big', '55661161', 'i think i will need also 2 big coca-cola ');
    const o1 = new Order('facebook : monkey de Lofy', '5548556', 1, [e1, e2], Number.parseInt(time + ''));
    const o2 = new Order('Slack: Black Sworeded', '477742266', 1, [e1, e2], time);
    this.order_list.push(o1, o2);
    // if type === current get only from socket
    // if type === fulllog get all from socket + db
    // if mangeOrder === true ,  allow the user to manager the orders
  }

  ngOnInit() {
  }

  showInfo(order_item: OrderItems): void {
    let dialogRef = this.dialog.open(OrderItemInfoComponent, {
      width: '600px',
      data: { order_item: order_item }
    });
  }
}

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
