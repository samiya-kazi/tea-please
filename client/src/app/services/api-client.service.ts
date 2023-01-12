import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  rootUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  login (email: string, password: string) : Observable<HttpResponse<User>> {
    return this.http.post<User>(this.rootUrl + '/login', { email, password }, { observe: 'response' });
  }

  register (firstName: string, lastName: string, designation: string, email: string, password: string) {
    return this.http.post<User>(this.rootUrl + '/register', { firstName, lastName, designation, email, password }, { observe: 'response' });
  }

  getAllOrders () : Observable<Order[]> {
    return this.http.get<Order[]>(this.rootUrl + '/order');
  }
}
