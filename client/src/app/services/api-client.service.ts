import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  rootUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  login (email: string, password: string) : Observable<HttpResponse<User>> {
    return this.http.post<User>(this.rootUrl + '/login', { email, password }, { observe: 'response' });
  }
}
