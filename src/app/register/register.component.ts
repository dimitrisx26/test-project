import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string = null;

  constructor(private authService: AuthService) {
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
//todo you are using a depricated function here, fix it
    this.authService.signup(email, password).subscribe({
      next: (resData) => {
        console.log(resData);
    }
      ,error:
      (errorMessage) => {
        this.error = errorMessage;
      }}
    );

    this.registerForm.reset();
  }
}
