import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../class/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private curr_user: User;
  constructor(private _userService: UserService, private snackBar: MatSnackBar) {
    this.curr_user = new User('', '', '', '', '');
   }

  ngOnInit() {
    this.getUserData();
  }
  private getUserData() {
    this._userService.getUser()
      .subscribe(data => {
        if (data['user'] !== false) {
          let r = data['user'];
          this.curr_user = new User(r._id, r.pseudo, r.name, r.last_name, r.resto_name);
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
