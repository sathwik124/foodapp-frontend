import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'foodorder';
  // islogged: boolean = false;

  // constructor(private auth: AuthService) {}

  ngOnInit(): void {
    
  }

  // islogg() {
  //   this.auth.isloggedin().subscribe(Response => {
  //     this.islogged = Response
  //   });
  //   return this.islogged;
  // }

  islog() {
    if(localStorage.getItem('user')) {
      return true;
    }
    else {
      return false;
    }
  }
}
