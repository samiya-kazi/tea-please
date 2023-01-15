import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated () {
    const userStr = localStorage.getItem('user');
    return userStr ? true : false;
  }
}
