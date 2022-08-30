import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {AppModule} from "../../app.module";
import {ReactiveFormsModule} from "@angular/forms";
import {InputValueAcessorDirective} from "../shared/directives/input-value-accessor.directive";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterUserComponent,
    InputValueAcessorDirective
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule { }
