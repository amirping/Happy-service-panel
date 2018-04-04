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
    this.curr_user = new User('', '', '', '', '');
  }
  ngOnInit() {
    this.getUserData();
  }
  private update_personal() {
    if ((this.curr_user.$name.length !== 0) && (this.curr_user.$last_name.length !== 0) && (this.curr_user.$resto_name.length !== 0)) {
      this._userService.updateUser_personel(this.curr_user)
        .subscribe(data => {
          // toast play
          if (data['ok'] === true) {
            this.snackBar.open('change have been saved', 'ok', {
              duration: 3000,
            });
          } else {
              this.snackBar.open(data['msg'], 'ok', {
                duration: 3000,
              });
              this.getUserData();
          }
        }, err => {
          this.snackBar.open('Sorry , we can\'t reach the server ,try again ', 'ok', {
            duration: 3000,
          });
          this.getUserData();
        });
    } else {
      this.snackBar.open('make sure to fill up all the required fields', 'ok', {
        duration: 3000,
      });
    }
  }
  private update_security() {
    if (this.user_security.new_password.length === 0 || this.user_security.old_password.length === 0) {
      this.snackBar.open('all fields are required', 'ok', {
        duration: 3000,
      });
    } else {
      if (this.user_security.new_password === this.user_security.old_password) {
        this.snackBar.open('cant make old new password same as the old one..', 'ok', {
          duration: 3000,
        });
      } else {
        // go ahead
        this._userService.updateUser_security(this.user_security.old_password, this.user_security.new_password)
          .subscribe(data => {
            if (data['ok'] === true) {
              this.snackBar.open('change have been saved', 'ok', {
                duration: 3000,
              });
              this.user_security.new_password = '';
              this.user_security.old_password = '';
            } else {
              this.snackBar.open(data['msg'], 'ok', {
                duration: 3000,
              });
              this.getUserData();
            }
          },
        err => {
          this.snackBar.open('Sorry , we can\'t reach the server ,try again ', 'ok', {
            duration: 3000,
          });
        });
      }
    }
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
