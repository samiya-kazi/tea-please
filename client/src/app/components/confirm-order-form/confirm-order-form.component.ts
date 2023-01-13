import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Order, OrderItem } from 'src/app/interfaces/order';
import { User } from 'src/app/interfaces/user';
import { ApiClientService } from 'src/app/services/api-client.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OrderSocketService } from 'src/app/services/order-socket.service';

@Component({
  selector: 'app-confirm-order-form',
  templateUrl: './confirm-order-form.component.html',
  styleUrls: ['./confirm-order-form.component.css']
})
export class ConfirmOrderFormComponent implements OnInit {

  user! : User;
  orderItems : OrderItem[] = [];

  confirmOrderFrom = this.fb.group({
    room: ''
  })

  constructor(private fb: FormBuilder,
     private api: ApiClientService, 
     private route: Router,
     private notification: NotificationService,
     private orderSocket: OrderSocketService
     ) { }

  ngOnInit(): void {
    this.checkAuthStatus();
    this.parseOrderItems();
    this.orderSocket.joinRoom();
  }

  checkAuthStatus () {
    const userStr = localStorage.getItem('user');
    this.user = userStr ? JSON.parse(userStr) : undefined;
  }

  parseOrderItems () {
    const orderListStr = localStorage.getItem('cart');
    if(orderListStr) {
      const orderList = JSON.parse(orderListStr);
      this.orderItems = orderList;
    }
  }

  handleSubmit() {
    if(this.orderItems.length && this.confirmOrderFrom.value.room) {
      this.api.postOrder(this.user._id, this.confirmOrderFrom.value.room, this.orderItems).subscribe({
        next: (res) => {
          this.orderSocket.sendOrder(res);
          localStorage.setItem('cart', JSON.stringify([]));
          this.route.navigate(['']);
          this.notification.showSuccess('You order has been placed.', "Success");
        },
        error: error =>{
          this.notification.showError(error.error ,'Post Error')
        }
      });
    }
  }

  handleRemoveItem (item: OrderItem) {
    this.orderItems = this.orderItems.filter(i => i != item);
    localStorage.setItem('cart', JSON.stringify(this.orderItems));
  }

  goBack () {
    this.route.navigate([''])
  }

}
