import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

interface AuthResponseData {
  id: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('https://reqres.in/api/register', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap(() => {
          this.router.navigate(['/login']);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('https://reqres.in/api/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.id, resData.token);
          this.router.navigate(['/welcome']);
        })
      );
  }

  autoLogin() {
    const userData: {
      id: string;
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.id, userData.token);

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/welcome']);
  }

  private handleAuthentication(userId: string, token: string) {
    const user = new User(userId, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Invalid credentials';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    return throwError(errorMessage);
  }
}
