import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'vini-button',
  imports: [RouterModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ViniButtonComponent {
  @Input({ required: true }) type!: "primary" | "secundary";
  @Input() text!: string;
}
