import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users: any[];
  tableColumns: string[] = ['ID', 'First Name', 'Last Name', 'Email', 'Avatar'];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe((resData) => {
      this.users = resData.data;
    })
  }

}
