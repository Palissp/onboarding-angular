import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  hasNumericValidator,
  hasUpperCaseValidator, specialCaracterValidator
} from "../../../../helpers/validators";
import {ToastService} from "../../../../utils/toast";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm!: FormGroup;
  public blockPage: boolean = false;

  private _subscriptions: Subscription;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private _fb: FormBuilder,
              private toastService: ToastService,
              private _authService: AuthService,
              private _router: Router) {
    this._subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, hasUpperCaseValidator(), Validators.minLength(8), hasNumericValidator(), specialCaracterValidator()]]
    })
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.loginForm.markAsDirty();
      this.toastService.show({
        text: `Por favor complete todos los campos requeridos.`,
        type: 'warning',
      });
      return
    }
    let {email, password} = this.loginForm.getRawValue();
    this.blockPage = true;
    this._subscriptions.add(
      this._authService.login(email, password).subscribe({
        next: (response) => {
          if (!response.user) {
            this.blockPage = false;
            this.toastService.show({
              text: `${response.message}`,
              type: 'warning',
            })
            return;
          }
          this.blockPage = false;
          sessionStorage.setItem('access-token', response.access_token);
          sessionStorage.setItem('user', JSON.stringify(response.user));
          sessionStorage.setItem('tokem_type', response.tokenType);
          this._router.navigate(['/admin']);
        },
        error: (error) => {
          this.toastService.show({
            text: `${error.error.message}`,
            type: 'warning',
          })
          this.blockPage = false;
        }
      })
    )
  }

  public getErrorMessage(formControlName: string): string {
    if (this.loginForm.valid) {
      return '';
    }
    let errorMessage = '';
    if (this.loginForm.get(formControlName)?.hasError('required')) {
      return formControlName == 'password' ? 'Contraseña requerida' : 'Correo es requerido';
    }
    if (this.loginForm.get(formControlName)?.hasError('hasUpperCase')) {
      errorMessage += 'Debe contener almenos una letra mayúscula.<br>';
    }
    if (this.loginForm.get(formControlName)?.hasError('passwordLength')) {
      errorMessage += 'La contraseña debe tener como mínimo 8 caracteres<br>';
    }
    if (this.loginForm.get(formControlName)?.hasError('hasNumeric')) {
      errorMessage += 'La contraseña debe tener almenos un numero<br>';
    }
    if (this.loginForm.get(formControlName)?.hasError('hasSpecialCaracter')) {
      errorMessage += 'La contraseña debe tener almenos un caracter especial<br>';
    }
    if (this.loginForm.get(formControlName)?.hasError('minlength')) {
      errorMessage += 'La contraseña debe tener mínimo 8 caracteres.<br>';
    }
    return errorMessage
  }

}
