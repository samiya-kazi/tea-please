import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderSocketService {

  constructor(private socket: Socket) { }

  joinRoom () {
    this.socket.emit('join_room');
  }

  sendOrder(order: Order) {
    this.socket.emit('post_order', order);
  }
  
  getNewOrder() {
    return this.socket.fromEvent<Order>('receive_order');
  }
}
