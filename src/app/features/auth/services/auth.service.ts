import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth } from '../models/UserAuth.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../../../core/utils/Constants';
import { tap } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environment/environment';
import * as forge from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  SECRET_KEY = environment.NG_APP_SECRET_KEY || '';

  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) { }

  register(user: UserAuth): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(`${Constants.apiUrl.BASE_URL}/${Constants.apiUrl.auth.AUTH_BASE}/${Constants.apiUrl.auth.AUTH_REGISTER}`, {
      ...user,
      password: this.hashPassword(user.password)
    }, { headers });
  }

  login(user: UserAuth): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(`${Constants.apiUrl.BASE_URL}/${Constants.apiUrl.auth.AUTH_BASE}/${Constants.apiUrl.auth.AUTH_LOGIN}`, {
      ...user,
      password: this.hashPassword(user.password)
    }, { headers }).pipe(
      tap(response => {
        this.setToken(response.token);
      })
    );
  }

  logout(): void {
    this.clearToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    sessionStorage.setItem('authToken', token);
    this.tokenSubject.next(token);
  }

  private getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  private clearToken(): void {
    sessionStorage.removeItem('authToken');
    this.tokenSubject.next(null);
  }

  private hashPassword(password: string) {
    const publicKey = forge.pki.publicKeyFromPem(this.SECRET_KEY);
    const encrypted = publicKey.encrypt(password, 'RSA-OAEP');
    return forge.util.encode64(encrypted);
  }

}
