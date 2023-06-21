import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupForm: FormGroup;
  
  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {
    this.signupForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.router.navigate(['/home']);
    }
  }

  onsubmit(): void {
    if(this.signupForm.valid){
      const username = this.signupForm.get('username')?.value;
      const password = this.signupForm.get('password')?.value;
      const email = this.signupForm.get('email')?.value;
      this.auth.signup(username,password,email).subscribe(
        (result) => {
          console.log(result);
          this.router.navigate(['/login']);
          this.toastr.success('Account has been created!!', 'Success');
        },
        (err: Error) => {
          this.toastr.error(err.message, 'Error');
        }
      );
    }

  }

}
