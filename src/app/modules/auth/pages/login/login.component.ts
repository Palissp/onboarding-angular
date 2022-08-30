import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  hasNumericValidator,
  hasUpperCaseValidator, specialCaracterValidator
} from "../../../../helpers/validators";
import {ToastService} from "../../../../utils/toast";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private _fb: FormBuilder,
              private toastService: ToastService,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, hasUpperCaseValidator(), Validators.minLength(8), hasNumericValidator(), specialCaracterValidator()]]
    })
  }

  public onSubmit(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      this.loginForm.markAsDirty();
      this.toastService.show({
        text: `Por favor complete todos los campos requeridos.`,
        type: 'warning',
      });
      return
    }

    //TODO: Mover esta validación al componente de registro
    this._authService.usernameExists(this.loginForm.get('email')?.value).subscribe(
      {
        next: (response) => {
          if(response.exists) {
            this.toastService.show({
              text: `El usuario ya existe.`,
              type: 'warning',
            });
          } else {
            this.toastService.show({
              text: `El usuario no existe.`,
              type: 'warning',
            });
          }
        },
        error: (error) => {
          this.toastService.show({
            text: `Ocurrió un error al intentar validar el usuario.` + error,
            type: 'warning',
          });
        }
      }
    )
  }

  public getErrorMessage(formControlName: string): string {
    if (this.loginForm.valid) {
      return '';
    }
    let errorMessage = '';
    if (this.loginForm.get(formControlName)?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (this.loginForm.get(formControlName)?.hasError('hasUpperCase')) {
      errorMessage += 'Debe contener almenos una letra mayúscula.\n';
    }
    if (this.loginForm.get(formControlName)?.hasError('passwordLength')) {
      errorMessage += 'La contraseña debe tener como mínimo 8 caracteres\n';
    }
    if (this.loginForm.get(formControlName)?.hasError('hasNumeric')) {
      errorMessage += 'La contraseña debe tener almenos un numero\n';
    }
    if (this.loginForm.get(formControlName)?.hasError('hasSpecialCaracter')) {
      errorMessage += 'La contraseña debe tener almenos un caracter especial\n';
    }
    if (this.loginForm.get(formControlName)?.hasError('minlength')) {
      errorMessage += 'La contraseña debe tener mínimo 8 caracteres.\n';
    }
    return errorMessage
  }

}
