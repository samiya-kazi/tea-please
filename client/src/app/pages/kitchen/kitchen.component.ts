import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { ApiClientService } from 'src/app/services/api-client.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  orders: Order[] = [];
  inProgress: Order[] = [];
  completed: Order[] = [];

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

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

      let newStatus;

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

      this.api.changeOrderStatus(event.container.data[0]._id, newStatus).subscribe(order => {
        console.log(order);
      })
    }
  }
}
