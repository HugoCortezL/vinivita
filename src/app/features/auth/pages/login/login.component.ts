import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLayoutComponent } from '../../../../shared/layouts/auth-layout/auth-layout.component';
import { ViniTextFieldInputComponent } from '../../../../shared/components/dls/text-field-input/text-field-input.component';
import { ViniButtonComponent } from '../../../../shared/components/dls/button/button.component';
import { ViniPasswordFieldInputComponent } from '../../../../shared/components/dls/password-field-input/password-field-input.component';
import { Constants } from '../../../../core/utils/Constants';
import { AuthService } from '../../services/auth.service';
import { UserAuth } from '../../models/UserAuth.model';
import { getErrorMessage } from '../../../../core/utils/getErrorMessage';
import { ProfileService } from '../../../profile/services/profile.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthLayoutComponent,
    ViniTextFieldInputComponent,
    ViniPasswordFieldInputComponent,
    ViniButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constants = Constants;
  getErrorMessage = getErrorMessage;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  form = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required]))
  })

  login() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: UserAuth = {
      email: this.form.controls['email'].value ?? '',
      password: this.form.controls['password'].value ?? '',
    };

    this.authService.login(user).subscribe({
      next: (response) => {

        this.profileService.getProfile(response.data.value?.user_id || '').subscribe({
          next: (response) => {
            if (!response) {
              this.router.navigate([`${this.constants.paths.CREATE_PROFILE_PATH}`])
            } else {
              this.router.navigate(['/'])
            }
          }
        })
      },
      error: (error) => {
        this.form.setErrors({ invalidCredentials: true })
      },
    });
  }
}
