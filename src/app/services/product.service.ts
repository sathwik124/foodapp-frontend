import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { food } from 'food';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/foods';

  constructor(private http: HttpClient) { }

  getfoods(): Observable<food[]> {
    return this.http.get<food[]>(this.baseUrl);
  }

  getfooditem(id: number): Observable<food> {
    return this.http.get<food>(`${this.baseUrl}/${id}`);
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
}
