import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onLogin() {
    console.log('Login form submitted');
    console.log(this.loginForm.get('email').value);
    console.log(this.loginForm.get('password').value);
    this.router.navigate(['/welcome']);

    this.loginForm.reset();
  }
}
