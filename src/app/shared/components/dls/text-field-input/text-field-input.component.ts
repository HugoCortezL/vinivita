import { Component, Input, forwardRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'vini-text-field-input',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './text-field-input.component.html',
  styleUrl: './text-field-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ViniTextFieldInputComponent),
      multi: true,
    },
  ],
})
export class ViniTextFieldInputComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) placeholder!: string;
  @Input() errorMessage?: string;

  value: string = ''; // Armazena o valor do input
  disabled = false; // Gerencia o estado de desabilitação

  get safeId(): string {
    return this.label.toLowerCase().replace(/\s+/g, '-');
  }

  onChange = (value: string) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.onChange(inputElement.value);
    }
  }
}
