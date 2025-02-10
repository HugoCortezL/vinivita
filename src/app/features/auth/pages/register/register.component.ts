import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViniButtonComponent } from '../../../../shared/components/dls/button/button.component';
import { ViniTextFieldInputComponent } from '../../../../shared/components/dls/text-field-input/text-field-input.component';
import { AuthLayoutComponent } from '../../../../shared/layouts/auth-layout/auth-layout.component';
import { ViniPasswordFieldInputComponent } from '../../../../shared/components/dls/password-field-input/password-field-input.component';
import { Constants } from '../../../../core/utils/Constants';
import { UserAuth } from '../../models/UserAuth.model';
import { AuthService } from '../../services/auth.service';
import { getErrorMessage } from '../../../../core/utils/getErrorMessage';
import { matchPasswordValidator } from '../../validators/matchPasswordValidator.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthLayoutComponent,
    ViniTextFieldInputComponent,
    ViniPasswordFieldInputComponent,
    ViniButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constants = Constants;
  getErrorMessage = getErrorMessage;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  form = new FormGroup({
    email: new FormControl<string>('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl<string>('', Validators.compose([Validators.required, Validators.minLength(8)])),
    confirmPassword: new FormControl<string>('', Validators.compose([Validators.required]))
  }, { validators: matchPasswordValidator() })

  register() {
    this.router.navigate([`${this.constants.paths.REGISTER_PATH}/${this.constants.paths.CONFIRM_EMAIL_PATH}`], {
      state: { email: 'hugo@gmail.com' }
    })
    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   return;
    // }

    // const user: UserAuth = {
    //   email: this.form.controls['email'].value ?? '',
    //   password: this.form.controls['password'].value ?? '',
    // };
    // this.authService.register(user).subscribe({
    //   next: (response) => {
    //     this.router.navigate([`${this.constants.paths.REGISTER_PATH}/${this.constants.paths.CONFIRM_EMAIL_PATH}`], {
    //       state: { email: user.email }
    //     })
    //   },
    //   error: (error) => {
    //     console.error('Erro ao registrar usuário', error);
    //   },
    // });
  }

  isOnConfirmEmailRoute(): boolean {
    return this.router.url.includes(Constants.paths.CONFIRM_EMAIL_PATH);
  }
}
