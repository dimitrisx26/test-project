import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUsers(page: number, limit: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/users?page=${page}&per_page=${limit}`
    );
  }
}
