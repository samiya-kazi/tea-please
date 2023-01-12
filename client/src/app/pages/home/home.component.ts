import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.route.navigate(['login']);
    } else {
      const user = JSON.parse(userStr);
      if (user.isAdmin) {
        this.route.navigate(['kitchen']);
      }
    }
  }

}
