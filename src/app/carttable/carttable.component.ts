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
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getcartitems().subscribe((Response) => {
      this.citems = Response;
      this.dataSource = new MatTableDataSource<cartitem>(this.citems);
      console.log(Response);
    })
  }

  removeFromCart(item: cartitem) {
    this.productService.deletecartitem(item.id).subscribe();
    this.citems = this.citems.filter((cartItem) => cartItem.id !== item.id);
    this.dataSource.data = this.citems;
  }

}
