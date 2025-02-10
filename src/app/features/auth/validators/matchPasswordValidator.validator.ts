import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
        const passwordControl = form.get('password');
        const confirmPasswordControl = form.get('confirmPassword');

        if (!passwordControl || !confirmPasswordControl) {
            return null;
        }

        const password = passwordControl.value;
        const confirmPassword = confirmPasswordControl.value;

        if (!confirmPassword) {
            return null;
        }

        if (password !== confirmPassword) {
            confirmPasswordControl.setErrors({ passwordMismatch: true });
        } else {
            confirmPasswordControl.setErrors(null);
        }

        return null;
    };
}