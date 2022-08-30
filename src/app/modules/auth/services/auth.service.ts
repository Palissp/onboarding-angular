import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CheckUsernameResponse} from "../models/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usernameExistsUrl = environment.apiUrl + '/users/exist-name/';
  constructor(private http: HttpClient) { }

  public usernameExists(username: string): Observable<CheckUsernameResponse> {
    return this.http.get<CheckUsernameResponse>(this.usernameExistsUrl + username);
  }
}
