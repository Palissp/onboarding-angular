import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {createUser, createUserResponse, ExistResponse, loginResponse} from "../models/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public usernameExists(username: string): Observable<ExistResponse> {
    return this.http.get<ExistResponse>(this.apiUrl + '/users/exist-name/' + username);
  }

  public login(email: string, password: string): Observable<loginResponse & {name: string; message: string;}> {
    return this.http.post<loginResponse & {name: string; message: string;}>(this.apiUrl + '/users/login', {username: email, password: password});
  }

  public emailExists(email: string): Observable<ExistResponse> {
    return this.http.get<ExistResponse>(this.apiUrl + '/users/exist-email', {params: {email: email}});
  }

  public createUser(user: createUser): Observable<createUserResponse> {
    return this.http.post<createUserResponse>(this.apiUrl + '/users/', user);
  }
}
