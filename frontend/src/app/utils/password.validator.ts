import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const rules = [
      { key: 'hasMinLength', test: value.length >= 6 },
      { key: 'hasUpperCase', test: /[A-Z]/.test(value) },
      { key: 'hasLowerCase', test: /[a-z]/.test(value) },
      { key: 'hasNumeric', test: /[0-9]/.test(value) },
      { key: 'hasSpecialChar', test: /[!@#$%^&*]/.test(value) },
    ];

    const failed = rules.filter((r) => !r.test);

    return failed.length
      ? { passwordStrength: Object.fromEntries(failed.map((r) => [r.key, false])) }
      : null;
  };
}
