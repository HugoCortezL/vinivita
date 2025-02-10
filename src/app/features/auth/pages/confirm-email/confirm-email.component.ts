import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ViniButtonComponent } from '../../../../shared/components/dls/button/button.component';

@Component({
  selector: 'app-confirm-email',
  imports: [RouterModule, ViniButtonComponent],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent {
  email: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.email = navigation?.extras.state?.['email'] || '';
  }

  resendEmail() { }
}
