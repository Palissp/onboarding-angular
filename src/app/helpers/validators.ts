import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import {AuthService} from "../modules/auth/services/auth.service";
import {map, Observable} from "rxjs";
import {ExistResponse} from "../modules/auth/models/auth";

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

export function checkPasswords(): ValidatorFn {
  return (control: AbstractControl):  ValidationErrors | null => {
    let pass = control.parent?.get('password')?.value;
    let confirmPass = control.parent?.get('confirmPassword')?.value || ''
    return pass === confirmPass ? null : { notSame: true }
  }
}


export class UsernameValidator {
  static createValidator(_authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return _authService
        .usernameExists(control.value)
        .pipe(map((result: ExistResponse) => result.exists ? { usernameAlreadyExists: true } : null));
    };
  }
}

export class EmailValidator {
  static createValidator(_authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return _authService
        .emailExists(control.value)
        .pipe(map((result: ExistResponse) => result.exists ? { emailAlreadyExists: true } : null));
    };
  }
}
