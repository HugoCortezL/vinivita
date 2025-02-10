import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../../core/utils/Constants';
import { Profile } from '../models/Profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${Constants.apiUrl.BASE_URL}/${Constants.apiUrl.profile.PROFILE_BASE}/${userId}`);
  }

  createProfile(profile: Profile): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(`${Constants.apiUrl.BASE_URL}/${Constants.apiUrl.profile.PROFILE_BASE}`, profile, { headers });
  }
}