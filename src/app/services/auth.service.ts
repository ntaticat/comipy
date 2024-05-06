import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  postLogin(body: { email: string; password: string }) {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/auth/login`, body)
      .pipe(
        tap((response) => this.setTokenLocalstorage(response.token)),
        tap(() => this.router.navigateByUrl('/main')),
        catchError((error) => {
          console.error('Error en la solicitud:', error);
          return error;
        })
      );
  }

  setTokenLocalstorage(token: string) {
    localStorage.setItem('token', token);
  }

  getTokenLocalstorage() {
    return localStorage.getItem('token') ?? '';
  }

  decodeJWT(token: string) {
    const decodeToken = JSON.parse(atob(token.split('.')[1]));
    return decodeToken;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }
}
