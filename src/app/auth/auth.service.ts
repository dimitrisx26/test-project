import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

interface AuthResponseData {
  id: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user = new BehaviorSubject<User>(null);

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
      _token: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.id, userData._token);

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/welcome']);
    localStorage.removeItem('userData');
  }

  private handleAuthentication(userId: string, token: string) {
    const user = new User(userId, token);
    this.user.next(user);
    localStorage.setItem(
      'userData',
      JSON.stringify({ id: userId, _token: token })
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    //todo you are using the function in a wrong way, fix it
    //todo show the error from the service
    let errorMessage = 'Invalid credentials';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(()=>errorRes.error || errorRes.error.error);
    }

    return throwError(()=>errorMessage);
  }
}
