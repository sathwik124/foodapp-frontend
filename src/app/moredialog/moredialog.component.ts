import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

  constructor(public dialogref: MatDialogRef<MoredialogComponent>, @Inject(MAT_DIALOG_DATA)
  public data: any) {
    this.imgsrc = data.imgsrc || '';
    this.product_title = data.product_title || '';
    this.desc = data.desc || '';
    this.rating = data.rating || 0;

  }

  ngOnInit(): void {
    
  }

}
