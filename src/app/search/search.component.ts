import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { food } from 'food';
import { ProductService } from '../services/product.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
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
  selected_item: food[] = [];
  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
    this.myform = formBuilder.group({
      item: ['']
    });
  }

  ngOnInit(): void {
    this.productService.getfoods().subscribe(Response => {
      console.log(Response);
      this.food_items = Response;
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

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedProductName = event.option.value;
    const selectedProduct = this.food_items.find(product => product.name === selectedProductName);
    if (selectedProduct) {
      console.log(selectedProduct);
      this.selected_item.push(selectedProduct);
    }
  }
  
  onSubmit() {
    this.food_items = this.selected_item;
  }
}