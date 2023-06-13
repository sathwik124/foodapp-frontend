import { Component, OnInit } from '@angular/core';
import { cartitem } from 'cartitem';
import { ProductService } from '../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-carttable',
  templateUrl: './carttable.component.html',
  styleUrls: ['./carttable.component.css']
})
export class CarttableComponent implements OnInit{

  dataSource: MatTableDataSource<cartitem> = new MatTableDataSource<cartitem>();
  citems: cartitem[] = [];
  total_price: number = 0;
  item: cartitem = {
    id: 0,
    name: "x",
    quantity: 0,
    price: 0,
    totprice: 0,
    tag: "x"
  }
  cartcount: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getcartitems().subscribe((Response) => {
      this.citems = Response;
      this.dataSource = new MatTableDataSource<cartitem>(this.citems);
      this.updatecartlength();
      console.log(Response);
      for( let i=0; i < this.citems.length; i++){
        this.total_price+=this.citems[i].totprice;
      }
    })
  }

  updatecartlength() {
    this.cartcount = this.citems.length;
    this.productService.updatecartcount(this.cartcount);
  }

  removeFromCart(item: cartitem) {
    this.productService.deletecartitem(item.id).subscribe();
    this.citems = this.citems.filter((cartItem) => cartItem.id !== item.id);
    this.dataSource.data = this.citems;
    this.total_price-=item.totprice;
    this.updatecartlength();
  }

  checkoutcart() {
    for( let i=this.citems.length-1; i >= 0; i--) {
      this.productService.deletecartitem(this.citems[i].id).subscribe();
      this.citems.pop();
    }
    this.dataSource.data = this.citems;
    this.total_price = 0;
    this.updatecartlength();
  }
}
