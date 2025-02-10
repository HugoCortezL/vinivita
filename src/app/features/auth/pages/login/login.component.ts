import { Component } from '@angular/core';
import { AuthLayoutComponent } from '../../../../shared/layouts/auth-layout/auth-layout.component';
import { ViniTextFieldInputComponent } from '../../../../shared/components/dls/text-field-input/text-field-input.component';
import { ViniButtonComponent } from '../../../../shared/components/dls/button/button.component';
import { RouterModule } from '@angular/router';
import { Constants } from '../../../../core/utils/Constants';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthLayoutComponent,
    ViniTextFieldInputComponent,
    ViniButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constants = Constants;

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  login() {
    console.log(this.form.controls['email'].value)
  }
}
