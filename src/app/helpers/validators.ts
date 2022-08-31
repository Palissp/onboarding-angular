import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function hasUpperCaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }
    const hasUpperCase = /[A-Z]+/.test(value);
    //TODO: Verificar estructura del return de ValidationErrors
    return !hasUpperCase ? {hasUpperCase: true} : null;
  }
}

export function hasNumericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }
    const hasNumeric = /[0-9]+/.test(value);
    return !hasNumeric ? {hasNumeric: true} : null;
  }
}
export function specialCaracterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }
    const hasSpecialCaracter: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return !hasSpecialCaracter.test(value) ? {hasSpecialCaracter: true} : null;
  }
}
