import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    pseudo: "",
    password: ""
  }
  constructor(public snackBar: MatSnackBar, private authService: AuthServiceService) { }

  ngOnInit() {
  }
  sigin(event: Event) {
    if ((this.user.pseudo.length != 0 && this.user.pseudo != null) && (this.user.password.length != 0 && this.user.password != null)) {
      // run http request to server
      //let snackBarRef = snackBar.open('Message archived');
      this.authService.login(this.user.pseudo, this.user.password).subscribe(res => { console.log(res)}, (err) => {
        console.log(err);
        this.snackBar.open("Sorry , we can't reach the server ,try again ", "ok", {
          duration: 3000,
        });
      });
    }
    else {
      // show error
      this.snackBar.open("please , notice that the field are requested", "ok", {
        duration: 3000,
      });
    }
  }

}
