import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cartitem } from 'cartitem';
import { food } from 'food';
import { review } from 'review';
import { BehaviorSubject, Observable, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://127.0.0.1:8000/api/';
  private cartcountsub = new BehaviorSubject<number>(0);
  cartcount$ = this.cartcountsub.asObservable();

  constructor(private http: HttpClient) { }


  getreviews(id: number): Observable<review[]> {
    return this.http.get<review[]>(this.baseUrl+'allreviews/'+`${id}`);
  }

  addreview(ritem: review): Observable<review> {
    return this.http.post<review>(this.baseUrl+'putreview/',ritem,httpOptions);
  }

  getrating(id: number): Observable<number> {
    return this.http.get<number>(this.baseUrl+'rate/'+`${id}`);
  }

  getfoods(): Observable<food[]> {
    return this.http.get<food[]>(this.baseUrl);
  }

  getfooditem(id: number): Observable<food[]> {
    return this.http.get<food[]>(this.baseUrl+'getc/'+`${id}`);
  }

  getfoodnames(): Observable<string[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map((response) => response.map((item) => item.name))
    );
  }

  getrecommendedfood(searchItem: string): Observable<string[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(data => {
        const filteredData = data.filter(item => item.name.toLowerCase().includes(searchItem.toLowerCase()));
        return filteredData.map(item => item.name)
      })
    );
  }

  addtocart(citem: cartitem): Observable<cartitem> {
    return this.http.post<cartitem>(this.baseUrl+'add/',citem,httpOptions);
  }

  getcartitems(uid: string|null): Observable<cartitem[]> {
    return this.http.get<cartitem[]>(this.baseUrl+'get/'+`${uid}`);
  }

  deletecartitem(id: number): Observable<cartitem> {
    return this.http.delete<cartitem>(this.baseUrl+'delete/'+`${id}`);

  }

  updatecartcount(count: number) {
    this.cartcountsub.next(count);
  }
}
