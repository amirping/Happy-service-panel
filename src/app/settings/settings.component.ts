import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../class/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  curr_user: User;
  user_security = {
    old_password: '',
    new_password: ''
  };
  constructor(private _userService: UserService, public snackBar: MatSnackBar) { 
   }

  ngOnInit() {
    this._userService.getUser()
      .subscribe(data => {
        if (data['user'] !== false) {
          let r = data['user'];
          this.curr_user = new User(r._id, r.pseduo, r.name, r.last_name, r.resto_name);
        } else {
          this.snackBar.open('Sorry , some thing went wrong , you have to login again', 'ok', {
            duration: 3000,
          });
        }
      }, err => {
        this.snackBar.open('Sorry , we can\'t reach the server ,try again ', 'ok', {
          duration: 3000,
        });
      });
  }
}
