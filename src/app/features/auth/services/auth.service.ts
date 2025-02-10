import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth } from '../models/UserAuth.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../../../core/utils/Constants';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) { }

  register(user: UserAuth): Observable<any> {
    return this.http.post<any>(`${Constants.apiUrl.BASE_URL}/${Constants.apiUrl.auth.AUTH_BASE}/${Constants.apiUrl.auth.AUTH_REGISTER}`, user);
  }

  login(user: UserAuth): Observable<any> {
    return this.http.post<any>(`${Constants.apiUrl.BASE_URL}/${Constants.apiUrl.auth.AUTH_BASE}/${Constants.apiUrl.auth.AUTH_LOGIN}`, user).pipe(
      tap(response => {
        this.setToken(response.token);
      })
    );
  }

  logout(): void {
    this.clearToken();
  }

  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.tokenSubject.next(token);
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private clearToken(): void {
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
