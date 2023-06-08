import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quantdialog',
  templateUrl: './quantdialog.component.html',
  styleUrls: ['./quantdialog.component.css']
})
export class QuantdialogComponent implements OnInit{

  quantity: number;

  constructor(public dialogref: MatDialogRef<QuantdialogComponent>, @Inject(MAT_DIALOG_DATA)
  public data: any) {
    this.quantity = data.quantity || 0;
  }

  ngOnInit(): void {
    
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

}
