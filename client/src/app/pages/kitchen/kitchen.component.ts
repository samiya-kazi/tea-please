import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { ApiClientService } from 'src/app/services/api-client.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { NotificationService } from 'src/app/services/notification.service';
import { OrderSocketService } from 'src/app/services/order-socket.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  orders: Order[] = [];
  inProgress: Order[] = [];
  completed: Order[] = [];

  constructor(private route: Router,
    private api: ApiClientService,
    private notification: NotificationService,
    private orderSocket: OrderSocketService
    ) { }

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (!user.isAdmin) {
        this.route.navigate(['order']);
      }
    }

    this.getAllOrders();
    this.orderSocket.joinRoom();
    this.orderSocket.getNewOrder().subscribe(res => {
      this.orders = [...this.orders, res]
      this.notification.showInfo('New order added.', '')
    });
  }

  getAllOrders () {
    this.api.getAllOrders().subscribe(orders => {
      this.orders = orders.filter(order => order.status === 'created');
      this.inProgress = orders.filter(order => order.status === 'in-progress');
      this.completed = orders.filter(order => order.status === 'completed');
    });
  }

  drop(event: CdkDragDrop<Order[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      let newStatus: string;

      switch (event.container.id) {
        case 'cdk-drop-list-0': 
          newStatus = 'created';
          break;
        case 'cdk-drop-list-1':
          newStatus = 'in-progress';
          break;
        case 'cdk-drop-list-2':
          newStatus = 'completed'
          break;
        default:
          newStatus = 'created';
      }

      this.api.changeOrderStatus(event.container.data[0]._id, newStatus).subscribe({
        next: () => {
          this.notification.showSuccess(`Status changed to: ${newStatus}`, 'Order Status Changed Successful');
        },
        error: error => {
          this.notification.showError(error.error, 'Status Change Error');
        }
      })
    }
  }
}
