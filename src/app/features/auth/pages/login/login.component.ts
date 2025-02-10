import { Component, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthLayoutComponent,
    ViniTextFieldInputComponent,
    ViniPasswordFieldInputComponent,
    ViniButtonComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constants = Constants;
  getErrorMessage = getErrorMessage;
  isLoading = false;

  form = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required]))
  })

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.profileService.getProfile(this.authService.getUserId()).subscribe({
      next: (response) => {
        this.router.navigate(['/'])
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  login() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: UserAuth = {
      email: this.form.controls['email'].value ?? '',
      password: this.form.controls['password'].value ?? '',
    };

    this.isLoading = true;
    this.authService.login(user).subscribe({
      next: (response) => {

        this.profileService.getProfile(response.data.value?.user_id || '').subscribe({
          next: (response) => {
            if (!response) {
              this.router.navigate([`${this.constants.paths.CREATE_PROFILE_PATH}`])
            } else {
              this.router.navigate(['/'])
            }
          },
          complete: () => {
            this.isLoading = false;
          }
        })
      },
      error: (error) => {
        this.form.setErrors({ invalidCredentials: true })
        this.isLoading = false;
      },
    });
  }
}
