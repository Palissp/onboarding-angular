import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Category} from "../../auth/models/auth";
import {HttpClient} from "@angular/common/http";
import {Book, SearchBooks} from "../models/library";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + '/category');
  }

  public getBooksListByFilter(category: number | null, search: string): Observable<SearchBooks> {
    return this.http.post<SearchBooks>(this.apiUrl + '/books/filter', {title: search, category: [category]});
  }

  public getBooksByUserAuthenticate(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/books/owner');
  }
}
