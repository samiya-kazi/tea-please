import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { User } from 'src/app/interfaces/user';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {

  @Input() order!: Order;
  user! : User;

  constructor(private api : ApiClientService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser () {
    this.api.getUserInfo(this.order.userId).subscribe(user => this.user = user);
  }

}
