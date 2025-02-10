import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../../core/utils/Constants';
import { ProfileInput } from '../models/Profile.model';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getProfile(userId: string): Observable<any> {
    const headers = { 'authorization': `Bearer ${this.authService.getToken()}` };
    return this.http.get<any>(`${Constants.apiUrl.BASE_URL}/${Constants.apiUrl.profile.PROFILE_BASE}/${userId}`, { headers });
  }

  createProfile(profile: ProfileInput): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${this.authService.getToken()}`
    };
    return this.http.post<any>(`${Constants.apiUrl.BASE_URL}/${Constants.apiUrl.profile.PROFILE_BASE}`, profile, { headers });
  }

  
}