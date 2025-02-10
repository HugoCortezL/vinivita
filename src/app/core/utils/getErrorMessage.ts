import { FormGroup } from "@angular/forms";

export function getErrorMessage(form: FormGroup, field: string): string {
    const control = form.get(field);
    if (!control || !control.touched) return '';

    if (control.hasError('required')) return 'Este campo é obrigatório.';
    if (control.hasError('email')) return 'Você deve preencher um email válido.';
    if (control.hasError('minlength')) {
        const minLength = control.getError('minlength').requiredLength;
        return `A senha deve conter pelo menos ${minLength} caracteres.`;
    }
    if (control.hasError('passwordMismatch')) {
        return 'As senhas não coincidem.';
    }
    return '';

}