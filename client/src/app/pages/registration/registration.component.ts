import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client.service';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  registerForm = this.fb.group({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    designation: '',
  })

  hide = true;
  errorMessage: string = ''

  constructor(
    private fb: FormBuilder, 
    private api: ApiClientService,
    private route: Router) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    console.log(this.registerForm.value);
    const { firstName, lastName, designation, email, password } = this.registerForm.value;
    if (firstName && lastName && designation && email && password) {
      this.api.register(firstName, lastName, designation, email, password).subscribe({
        next: (res) => {
          console.log(res);
          if(res.status === 201 && res.body) {
            localStorage.setItem('accessToken', JSON.stringify(res.headers.get('Authorization')));
            localStorage.setItem('user', JSON.stringify(res.body));
            this.registerForm.reset();
            if(res.body.isAdmin) {
              this.route.navigate(['kitchen'])
            } else {
              this.route.navigate(['order'])
            }
          }
        },
        error: error => {
          this.errorMessage = error.error;
        }
      })
    }
  }

  toggleHide () {
    this.hide = !this.hide;
  }

}
