import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  orders: Order[] = [];

  constructor(private route: Router, private api: ApiClientService) { }

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.route.navigate(['login']);
    } else {
      const user = JSON.parse(userStr);
      if (!user.isAdmin) {
        this.route.navigate(['home']);
      }
    }

    this.getAllOrders();
  }

  getAllOrders () {
    this.api.getAllOrders().subscribe(orders => this.orders = orders);
  }

}
