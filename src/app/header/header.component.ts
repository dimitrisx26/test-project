import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  collapsed = true;

  constructor(private router: Router) {}

  onLogout() {
    this.router.navigate(['/welcome']);
  }
}
