import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViniButtonComponent } from '../dls/button/button.component';
import { Constants } from '../../../core/utils/Constants';
import { ProfileService } from '../../../features/profile/services/profile.service';
import { AuthService } from '../../../features/auth/services/auth.service';
import { ApiResponse } from '../../../core/models/ApiResponse.model';
import { Profile } from '../../../features/profile/models/Profile.model';

@Component({
  selector: 'app-header',
  imports: [RouterModule, ViniButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constants = Constants;
  profile?: ApiResponse<Profile> | null;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.authService.getUserId())
    this.profileService.getProfile(this.authService.getUserId()).subscribe({
      next: (response: ApiResponse<Profile>) => {
        this.profile = response
      },
      error: (error) => {
        this.profile = null
      },
    })
  }

  openProfileOptions() {

  }

}
