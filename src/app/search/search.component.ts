import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { food } from 'food';
import { ProductService } from '../services/product.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { QuantdialogComponent } from '../quantdialog/quantdialog.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  myform: FormGroup;
  items: string[] = [];
  food_items: food[] = [];
  searchControl: FormControl = new FormControl();
  filter_items: food[] = [];
  constructor(private formBuilder: FormBuilder, private productService: ProductService, public dialog: MatDialog) {
    this.myform = formBuilder.group({
      item: ['']
    });
  }

  ngOnInit(): void {
    this.productService.getfoods().subscribe(Response => {
      console.log(Response);
      this.food_items = Response;
      this.filter_items = Response;
    });

    this.productService.getfoodnames().subscribe(Response => {
      console.log(Response);
      this.items = Response;
    })

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.productService.getrecommendedfood(searchTerm).subscribe(recommendedNames => {
        this.items = recommendedNames;
      });
    });
  }

  openDialog(item: food): void {
    const dialogRef = this.dialog.open(QuantdialogComponent, {
      width: '250px',
      data: { quantity: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Selected quantity:', result);
        console.log('selected product:', item.name);
        
      }
    });
  }

  
  
  onSubmit() {
    this.filter_items = this.filterfoods(this.searchControl.value);
  }


  filterfoods(searchTerm: string): food[] {
    return this.food_items.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}