import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  constructor(private route: Router) { }

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
  }

}
