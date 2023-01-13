import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  faMugHot = faMugHot;

  constructor(private route: Router) { }

  loggedIn: boolean = false;
  user?: User;
  showMenu: boolean = false;

  ngOnInit(): void {
    this.checkAuthStatus();

    this.route.events.subscribe(e => {
      this.checkAuthStatus();
      this.showMenu = false;
    });
  }

  checkAuthStatus () {
    const userStr = localStorage.getItem('user');
    this.loggedIn = userStr ? true : false;
    this.user = userStr ? JSON.parse(userStr) : undefined;
  }

  logout () {
    localStorage.clear();
    this.route.navigate(['login']);
  }

  toggleMenu () {
    this.showMenu = !this.showMenu;
  }

}
