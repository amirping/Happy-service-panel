import { Component, OnInit } from '@angular/core';

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
  constructor() {
    this.choices.push({ id: '1', name: 'dishes' }, { id: '2', name: 'pizza' }, { id: '3', name: 'sandwiches' });
  }

  ngOnInit() {
  }

}
