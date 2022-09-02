import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LibraryService} from "../../../library/services/library.service";
import {Category, createUser} from "../../models/auth";
import {
  checkPasswords,
  EmailValidator,
  hasNumericValidator,
  hasUpperCaseValidator, specialCaracterValidator,
  UsernameValidator
} from "../../../../helpers/validators";
import {ToastService} from "../../../../utils/toast";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, OnDestroy {
  public registerForm!: FormGroup;
  public categoryList: Category[] = []
  public categoryListTemp: Category[] = [];
  public minimumCheck: boolean = false;
  public blockPage: boolean = false;

  private _subscriptions: Subscription;

  constructor(private _fb: FormBuilder,
              private _authService: AuthService,
              private _libraryService: LibraryService,
              private toastService: ToastService) {
    this._subscriptions = new Subscription();
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      nickname: ['', [Validators.required], [UsernameValidator.createValidator(this._authService)]],
      email: ['', [Validators.required, Validators.email], [EmailValidator.createValidator(this._authService)]],
      password: ['', [Validators.required, hasUpperCaseValidator(), Validators.minLength(8), hasNumericValidator(), specialCaracterValidator()]],
      confirmPassword: ['', [checkPasswords(), Validators.required]],
      category: new FormArray([]),
    },);
    this.getCategoryList();
  }

  public onCheckChange(event: any): void {
    //TODO: Implementar un pipe para no usar una variable temporal
    let category = this.categoryList.find(category => {
      return category.id == event.target.value
    })
    if (category) {
      category.checked = event.target.checked;
    }
    let categoryTemp = this.categoryListTemp.find(category => {
      return category.id == event.target.value
    })
    if (categoryTemp) {
      categoryTemp.checked = event.target.checked;
    }
  }

  private getCategoryList(): void {
    this._subscriptions.add(
      this._libraryService.getCategoryList().subscribe(
        {
          next: (data) => {
            data.forEach(category => {
              category.checked = false;
            })
            this.categoryList = data;
            this.categoryListTemp = data;
          },
          error: (err) => {

          }
        }));
  }

  public getErrorMessage(formControlName: string): string {
    if (this.registerForm.valid) {
      return '';
    }
    let errorMessage = '';
    if (this.registerForm.get(formControlName)?.hasError('hasUpperCase')) {
      errorMessage += 'Debe contener almenos una letra mayúscula.<br>';
    }
    if (this.registerForm.get(formControlName)?.hasError('passwordLength')) {
      errorMessage += 'La contraseña debe tener como mínimo 8 caracteres<br>';
    }
    if (this.registerForm.get(formControlName)?.hasError('hasNumeric')) {
      errorMessage += 'La contraseña debe tener almenos un numero<br>';
    }
    if (this.registerForm.get(formControlName)?.hasError('hasSpecialCaracter')) {
      errorMessage += 'La contraseña debe tener almenos un caracter especial<br>';
    }
    if (this.registerForm.get(formControlName)?.hasError('minlength')) {
      errorMessage += 'La contraseña debe tener mínimo 8 caracteres.<br>';
    }
    return errorMessage
  }

  public onSubmit(): void {
    let arrayOnlyChecked = this.categoryList.filter(category => category.checked);
    this.minimumCheck = arrayOnlyChecked.length < 3;
    if (this.registerForm.invalid || this.minimumCheck) {
      this.registerForm.markAllAsTouched();
      this.registerForm.markAsDirty();
      this.toastService.show({
        text: `Por favor complete todos los campos requeridos.`,
        type: 'warning',
      });
      return;
    }
    const formValues = this.registerForm.value;
    const createUser: createUser = {
      name: formValues.nickname,
      email: formValues.email,
      password: formValues.password,
      categories: arrayOnlyChecked.map(category => category.id)
    }
    this.blockPage = true;
    this._subscriptions.add(
      this._authService.createUser(createUser).subscribe({
        next: (data) => {
          this.toastService.show({
            text: `Usuario creado con exito.`,
            type: 'success',
          });
          this.blockPage = false;
          //TODO: Redirect to login page (Check if its necessary to redirect)
        },
        error: (err) => {
          this.toastService.show({
            text: `Error al crear usuario.`,
            type: 'warning',
          });
          this.blockPage = false;
        }
      })
    )
  }

  public filterCategory($event: any): void {
    if ($event.target.value != '') {
      this.categoryListTemp = this.categoryList.filter(category => category.description.toLowerCase().includes($event.target.value.toLowerCase()));
    } else {
      this.categoryListTemp = this.categoryList;
    }
  }
}
