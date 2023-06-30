import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { review } from 'review';

@Component({
  selector: 'app-moredialog',
  templateUrl: './moredialog.component.html',
  styleUrls: ['./moredialog.component.css']
})
export class MoredialogComponent implements OnInit {

  imgsrc: string;
  product_title: string;
  desc: string;
  rating: number;
  selectedValue: number = 0;
  dropdownOptions: number[] = [0, 1, 2, 3, 4, 5];
  enteredText: string = '';
  foodid: number = 0;
  revs: review[] = [];
  ritem: review = {
    rid: 0,
    fid: 0,
    userid: 0,
    rate: 0,
    revdesc: ""
  }

  constructor(public dialogref: MatDialogRef<MoredialogComponent>, @Inject(MAT_DIALOG_DATA)
  public data: any, private productService: ProductService, private toastr: ToastrService) {
    this.imgsrc = data.imgsrc || '';
    this.product_title = data.product_title || '';
    this.desc = data.desc || '';
    this.rating = data.rating || 0;
    this.foodid = data.foodid || 0;
  }

  ngOnInit(): void {
    this.productService.getreviews(this.foodid).subscribe(Response => {
      this.revs = Response;
    });
  }

  onSubmit() {
    this.ritem.rid = Math.random();
    this.ritem.fid = this.foodid;
    this.ritem.userid = parseInt(localStorage.getItem('userid')||'0');
    this.ritem.rate = this.selectedValue;
    this.productService.addreview(this.ritem).subscribe(Response => {
      this.toastr.success('Given '+Response.rate+'rating','Success');
    });
  }

  onaction() {
    this.ritem.rid = Math.random();
    this.ritem.fid = this.foodid;
    this.ritem.userid = parseInt(localStorage.getItem('userid')||'0');
    this.ritem.rate = this.selectedValue;
    this.ritem.revdesc = this.enteredText;
    this.productService.addreview(this.ritem).subscribe(Response => {
      this.toastr.success('Review Submitted','Success');
    });
    this.revs.push(this.ritem);
  }

}
