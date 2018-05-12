import { Component, OnInit } from '@angular/core';
import { RtSocketService } from '../services/rt-socket.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  constructor(private _rtSocket: RtSocketService) { }

  ngOnInit() {
    /**
     * this is very important to call init again since i make the service singleton so he 
     * we are losing the channel when the component call after the service instance in 
     * the main injection , so like that w tell the service that he need to start the
     * connection again with the RealTime Service , but only once for the both reservation and order
     * to avoid competion between theme to gather the cannel
    */
    this._rtSocket.initSocket();
  }

}
