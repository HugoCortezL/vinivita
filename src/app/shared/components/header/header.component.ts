import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViniButtonComponent } from '../dls/button/button.component';
import { Constants } from '../../../core/utils/Constants';

@Component({
  selector: 'app-header',
  imports: [RouterModule, ViniButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constants = Constants;
}
