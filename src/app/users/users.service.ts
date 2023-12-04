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
    //todo on typescript you use types! on typescript when you see any variable it smells bad code
    return this.http.get<any>(
      `${this.apiUrl}/users?page=${page}&per_page=${limit}`
    );
  }
}
