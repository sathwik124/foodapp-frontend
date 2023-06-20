import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  cartcount: number = 0;

  username: any;

  constructor(private productService: ProductService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getcartcount();
    this.getuser();
  }

  getcartcount() {
    this.productService.cartcount$.subscribe( res => {
      this.cartcount = res;
    })
  }

  logout() {
    //  console.log("clicked logout");
    //  this.auth.logout().subscribe(Response => {
    //   console.log(Response);
    //  });
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  
  getuser() {
    // this.auth.getusername().subscribe(Response => {
    //   this.username = Response.username;
    // })
    this.username = localStorage.getItem('user')?.slice(1,length-1);
  }
}
