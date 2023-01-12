import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: '',
    password: ''
  })

  hide = true;
  errorMessage = '';

  constructor(private fb: FormBuilder, private api: ApiClientService) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.api.login(email, password).subscribe({
        next: (res) => {
          if(res.status === 200 && res.body) {
            localStorage.setItem('accessToken', JSON.stringify(res.headers.get('Authorization')));
            localStorage.setItem('user', JSON.stringify(res.body));
            this.loginForm.reset();
          }
        },
      error: error => {
        this.errorMessage = error.error;
      }})
    }
  }

}
