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
  filter_items: food[] = [];
  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
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

  
  
  onSubmit() {
    this.filter_items = this.filterfoods(this.searchControl.value);
  }


  filterfoods(searchTerm: string): food[] {
    return this.food_items.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}