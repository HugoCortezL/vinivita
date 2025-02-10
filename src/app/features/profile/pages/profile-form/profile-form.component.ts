import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../../../../shared/layouts/main-layout/main-layout.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViniButtonComponent } from '../../../../shared/components/dls/button/button.component';
import { ViniTextFieldInputComponent } from '../../../../shared/components/dls/text-field-input/text-field-input.component';
import { Constants } from '../../../../core/utils/Constants';
import { getErrorMessage } from '../../../../core/utils/getErrorMessage';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ProfileInput } from '../../models/Profile.model';

@Component({
  selector: 'app-profile-form',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MainLayoutComponent,
    ViniTextFieldInputComponent,
    ViniButtonComponent
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent {
  constants = Constants;
  getErrorMessage = getErrorMessage;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) { }

  form = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
  })

  updateProfile() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const profile: ProfileInput = {
      user_id: this.authService.getUserId() ?? '',
      name: this.form.controls['name'].value ?? '',
    };

    this.profileService.createProfile(profile).subscribe({
      next: (response) => {
        this.router.navigate(['/'])
      },
      error: (error) => {
        this.form.setErrors({ unexpected: true })
      },
    });
  }
}
