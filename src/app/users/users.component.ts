import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: any[];
  totalUsers: number;
  tableColumns: string[] = ['ID', 'First Name', 'Last Name', 'Email', 'Avatar'];
  page: number = 1;
  limit: number = 5;

  constructor(private usersService: UsersService) {}

  ngOnInit() {

    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers(this.page, this.limit).subscribe((resData) => {
      this.users = resData.data;
      this.totalUsers = resData.total;
    });
  }

  onPageChange(page: number) {
    this.page = page;
    this.loadUsers();
  }
}
