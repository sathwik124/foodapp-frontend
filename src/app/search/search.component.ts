import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { food } from 'food';
import { ProductService } from '../services/product.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { QuantdialogComponent } from '../quantdialog/quantdialog.component';
import { cartitem } from 'cartitem';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MoredialogComponent } from '../moredialog/moredialog.component';
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
  expanded: boolean[] = [];
  hide: boolean[] = [];
  options: string[] = ["All", "Biryani", "Pizza", "Chinese"];
  selectedopt: string = "";
  rates:number = 0;
  citem: cartitem = {
    userid: "",
    cid: 0,
    name: "x",
    quantity: 0,
    price: 0,
    totprice: 0,
    tag: "y"
  };
  cCount: number = 0;
  constructor(private formBuilder: FormBuilder, private productService: ProductService, public dialog: MatDialog, private router: Router, private toastr: ToastrService, private elementRef: ElementRef) {
    this.myform = formBuilder.group({
      item: ['']
    });
  }

  ngOnInit(): void {
    if(!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
    this.productService.getfoods().subscribe(Response => {
      console.log(Response);
      this.food_items = Response;
      this.filter_items = Response;
      this.expanded = new Array<boolean>(this.food_items.length).fill(false);
      this.hide = new Array<boolean>(this.food_items.length).fill(true);
      this.productService.cartcount$.subscribe( res => {
        this.cCount = res;
      })
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
        this.citem.userid = localStorage.getItem('userid');
        this.citem.cid = item.fid;
        this.citem.name = item.name;
        this.citem.quantity = result;
        this.citem.tag = item.tag;
        this.citem.totprice = result * item.price;
        this.citem.price = item.price;
        this.productService.addtocart(this.citem).subscribe((Response) => {
          this.openAddedToCartSnackBar(Response);
        });
        this.productService.updatecartcount(this.cCount+1);
      }
    });
  }

  openmore(item: food): void {
    this.productService.getrating(item.fid).subscribe(Response => {
      this.rates = Response;
    })
    const dialogRef = this.dialog.open(MoredialogComponent,{
      width: '650px',
      data: { imgsrc: item.pic,
              product_title: item.name,
              desc: item.desc,
              rating: this.rates,
              foodid: item.fid }
    });
  }

  // isExpanded(index: number): boolean {
  //   return this.expanded[index];

  // }

  // ishide(index: number): boolean {
  //   return this.hide[index];
  // }

  // togglePanel(index: number): void {
  //   this.expanded[index] = !this.expanded[index];
  //   this.hide[index] = !this.hide[index];
  // }

  onSubmit() {
    this.filter_items = this.filterfoods(this.searchControl.value);
  }

  onchipselect(event: any) {
    this.selectedopt = event.source.value;
    if(this.selectedopt == "All"){
      this.filter_items = this.food_items;
    }
    else {
      this.filter_items = this.filterfooditems(this.selectedopt);
    }
  }

  filterfooditems(searchTerm: string): food[] {
    return this.food_items.filter(product =>
      product.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  filterfoods(searchTerm: string): food[] {
    return this.food_items.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  openAddedToCartSnackBar(response: any) {
    this.toastr.success(response.name+' Added to Cart', 'Success');
  }

  scrollToSection() {
    const sectionElement = this.elementRef.nativeElement.querySelector('#main');
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      console.log("randi ra randi")
    }
  }
}