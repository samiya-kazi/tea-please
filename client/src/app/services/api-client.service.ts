import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../interfaces/food';
import { Order, OrderItem } from '../interfaces/order';
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

  getUserInfo (id: string) : Observable<User> {
    return this.http.get<User>(this.rootUrl + `/user/${id}`);
  }

  changeOrderStatus (id: string, status: string) : Observable<Order> {
    return this.http.put<Order>(this.rootUrl + `/order/${id}/${status}`, {});
  }

  getAllFood () : Observable<Food[]> {
    return this.http.get<Food[]>(this.rootUrl + `/food`);
  }

  postOrder (userId: string, room: string, items: OrderItem[]) : Observable<Order> {
    return this.http.post<Order>(this.rootUrl + '/order', {userId, room, items});
  }

  getOwnOrders () : Observable<Order[]> {
    return this.http.get<Order[]>(this.rootUrl + '/user/orders');
  }
}
