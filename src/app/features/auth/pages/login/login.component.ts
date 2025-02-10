import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from '../../../../shared/layouts/auth-layout/auth-layout.component';
import { ViniTextFieldInputComponent } from '../../../../shared/components/dls/text-field-input/text-field-input.component';
import { ViniButtonComponent } from '../../../../shared/components/dls/button/button.component';
import { ViniPasswordFieldInputComponent } from '../../../../shared/components/dls/password-field-input/password-field-input.component';
import { Constants } from '../../../../core/utils/Constants';
import { AuthService } from '../../services/auth.service';
import { UserAuth } from '../../models/UserAuth.model';

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

  constructor(private authService: AuthService) { }

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  login() {
    const user: UserAuth = {
      email: this.form.controls['email'].value ?? '',
      password: this.form.controls['password'].value ?? '',
    };

    this.authService.login(user).subscribe({
      next: (response) => {
        console.log('Usuário logado com sucesso!', response);
      },
      error: (error) => {
        console.error('Erro ao logar usuário', error);
      },
    });
  }
}
