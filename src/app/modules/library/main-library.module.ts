import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './pages/library/library.component';
import { MyLibraryComponent } from './pages/my-library/my-library.component';
import { BookComponent } from './pages/book/book.component';
import {MainLibraryRoutingModule} from "./main-library.routing.module";
import {MainLibraryComponent} from "./main-library.component";
import {BookCardComponent} from "./components/book-card/book-card.component";
import {BookPageComponent} from "./components/book-page/book-page.component";



@NgModule({
  declarations: [
    MainLibraryComponent,
    LibraryComponent,
    MyLibraryComponent,
    BookComponent,
    BookCardComponent,
    BookPageComponent
  ],
  imports: [
    CommonModule,
    MainLibraryRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainLibraryModule { }
