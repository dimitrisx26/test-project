import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = null;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    //todo you are using a depricated function here, fix it
    this.authService.login(email, password).subscribe({
      next: (resData) => {
        console.log(resData);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
      },
    });

    this.loginForm.reset();
  }
}
