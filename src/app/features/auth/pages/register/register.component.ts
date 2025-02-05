import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViniButtonComponent } from '../../../../shared/components/dls/button/button.component';
import { ViniTextFieldInputComponent } from '../../../../shared/components/dls/text-field-input/text-field-input.component';
import { AuthLayoutComponent } from '../../../../shared/layouts/auth-layout/auth-layout.component';
import { Constants } from '../../../../core/utils/Constants';

@Component({
  selector: 'app-register',
  imports: [RouterModule, AuthLayoutComponent, ViniTextFieldInputComponent, ViniButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constants = Constants;
}
