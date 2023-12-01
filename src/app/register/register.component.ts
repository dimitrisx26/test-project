import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onRegister() {
    console.log('Register form submitted');
    console.log(this.registerForm.get('email').value);
    console.log(this.registerForm.get('password').value);
    this.router.navigate(['/login']);

    this.registerForm.reset();
  }
}
