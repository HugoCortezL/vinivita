import { Component } from '@angular/core';
import { AuthLayoutComponent } from '../../../../shared/layouts/auth-layout/auth-layout.component';
import { ViniTextFieldInputComponent } from '../../../../shared/components/dls/text-field-input/text-field-input.component';
import { ViniButtonComponent } from '../../../../shared/components/dls/button/button.component';
import { RouterModule } from '@angular/router';
import { Constants } from '../../../../core/utils/Constants';

@Component({
  selector: 'app-login',
  imports: [RouterModule, AuthLayoutComponent, ViniTextFieldInputComponent, ViniButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constants = Constants;
}
