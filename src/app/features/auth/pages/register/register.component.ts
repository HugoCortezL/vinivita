import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViniButtonComponent } from '../../../../shared/components/dls/button/button.component';
import { ViniTextFieldInputComponent } from '../../../../shared/components/dls/text-field-input/text-field-input.component';
import { AuthLayoutComponent } from '../../../../shared/layouts/auth-layout/auth-layout.component';
import { Constants } from '../../../../core/utils/Constants';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAuth } from '../../models/UserAuth.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthLayoutComponent,
    ViniTextFieldInputComponent,
    ViniButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constants = Constants;

  constructor(private authService: AuthService) { }

  form = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
    confirmPassword: new FormControl<string>('')
  })

  register() {
    const user: UserAuth = {
      email: this.form.controls['email'].value ?? '',
      password: this.form.controls['password'].value ?? '',
    };

    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso!', response);
      },
      error: (error) => {
        console.error('Erro ao registrar usuário', error);
      },
    });
  }
}
