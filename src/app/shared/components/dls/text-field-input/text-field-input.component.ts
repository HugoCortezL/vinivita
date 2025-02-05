import { Component, Input } from '@angular/core';

@Component({
  selector: 'vini-text-field-input',
  imports: [],
  templateUrl: './text-field-input.component.html',
  styleUrl: './text-field-input.component.scss'
})
export class ViniTextFieldInputComponent {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() errorMessage?: string;
}
