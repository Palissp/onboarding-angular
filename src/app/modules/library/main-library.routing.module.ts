import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LibraryComponent} from "./pages/library/library.component";
import {MyLibraryComponent} from "./pages/my-library/my-library.component";
import {BookComponent} from "./pages/book/book.component";
import {MainLibraryComponent} from "./main-library.component";

const routes: Routes = [
  {
    path: '',
    component: MainLibraryComponent,
    children: [
      {
        path: 'library',
        component: LibraryComponent,
      },
      {
        path: 'my-library',
        component: MyLibraryComponent,
      },
      {
        path: 'view/:id',
        component: BookComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLibraryRoutingModule {
}
