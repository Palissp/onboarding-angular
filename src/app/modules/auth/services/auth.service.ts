import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CheckUsernameResponse} from "../models/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public usernameExists(username: string): Observable<CheckUsernameResponse> {
    return this.http.get<CheckUsernameResponse>(this.apiUrl + '/users/exist-name/' + username);
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + '/users/login', {username: email, password: password});
  }
}
