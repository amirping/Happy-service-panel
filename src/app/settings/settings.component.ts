import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user_personal = {
    name : '',
    last_name :'',
    resto_name:''
  }
  user_security = {
    old_password:'',
    new_password:''
  }
  constructor() { }

  ngOnInit() {
  }

}
