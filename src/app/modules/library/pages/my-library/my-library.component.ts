import {Component, OnInit} from '@angular/core';
import {LibraryService} from "../../services/library.service";
import {Book, SearchBooks} from "../../models/library";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss']
})
export class MyLibraryComponent implements OnInit {
  public arrayOfBooks!: Book[];
  public arrayOfBooksTemp!: Book[];
  constructor(private _libraryService: LibraryService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._libraryService.getBooksByUserAuthenticate().subscribe({
      next: (data) => {
        this.arrayOfBooks = data;
        this.arrayOfBooksTemp = data;
      },
      error: (error) => {

      }
    })
  }

  public createBook(): void {
    this._router.navigate(['library/create-book']);
  }

  public filterBooks($event: any): void {
    if ($event.target.value != '') {
      this.arrayOfBooksTemp = this.arrayOfBooks.filter(book => book.title.toLowerCase().includes($event.target.value.toLowerCase()));
    } else {
      this.arrayOfBooksTemp= this.arrayOfBooks;
    }
  }
}
