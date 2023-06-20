import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  private baseurl = 'http://127.0.0.1:8000/api/';

  login(username: any, password: any): Observable<any> {
    const body = {username,password};
    return this.http.post<any>(this.baseurl+'login/',body);
  }

  signup(username: any, password: any, email: any): Observable<any> {
    const body = {username,password,email};
    return this.http.post<any>(this.baseurl+'signup/',body,httpOptions);
  }

  // getusername():Observable<any> {
  //   return this.http.get<any>(this.baseurl+'username/');
  // }

  // logout():Observable<any> {
  //   return this.http.post<any>(this.baseurl+'logout/',{},httpOptions);
  // }

  // isloggedin():Observable<boolean> {
  //   return this.http.get<boolean>(this.baseurl+'islog/');
  // }
}
