import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViniButtonComponent } from '../dls/button/button.component';
import { Constants } from '../../../core/utils/Constants';
import { ProfileService } from '../../../features/profile/services/profile.service';
import { AuthService } from '../../../features/auth/services/auth.service';
import { ApiResponse } from '../../../core/models/ApiResponse.model';
import { Profile } from '../../../features/profile/models/Profile.model';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, ViniButtonComponent, LoadingSpinnerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constants = Constants;
  profile?: ApiResponse<Profile> | null;
  isLoading = false;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.profileService.getProfile(this.authService.getUserId()).subscribe({
      next: (response: ApiResponse<Profile>) => {
        this.profile = response
        this.isLoading = false
      },
      error: (error) => {
        this.profile = null
        this.isLoading = false
      },
    })
  }

  openProfileOptions() {
    this.authService.logout()
  }

}
