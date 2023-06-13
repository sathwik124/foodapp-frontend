import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  cartcount: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getcartcount();
  }

  getcartcount() {
    this.productService.cartcount$.subscribe( res => {
      this.cartcount = res;
    })
  }

}
