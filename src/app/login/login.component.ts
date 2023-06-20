import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;


  constructor(private auth: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    // if(this.auth.isloggedin()) {
    //   this.router.navigate(['/home']);
    // }
    if(localStorage.getItem('user')){
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      this.auth.login(username,password).subscribe(
        (Response) => {
          localStorage.setItem('user',JSON.stringify(Response));
          this.router.navigate(['/home']);
        }
      );
    }
  }
  }