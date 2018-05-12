import { Component, OnInit, NgModule } from '@angular/core';
import { RtSocketService } from '../services/rt-socket.service';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  choices: Array<any> = [];
  menu = {
    cat: '',
    item: '',
    price: ''
  };
  constructor(private _rtSocket: RtSocketService) {
    this.choices.push({ id: '1', name: 'dishes' }, { id: '2', name: 'pizza' }, { id: '3', name: 'sandwiches' });
  }

  ngOnInit() {
    this._rtSocket.initSocket();
  }

}
