import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList : Order[] = [];

  constructor(private api: ApiClientService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders () {
    this.api.getOwnOrders().subscribe(orders => this.orderList = orders);
  }
}
