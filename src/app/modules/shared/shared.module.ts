import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockpageComponent } from './components/blockpage/blockpage.component';



@NgModule({
    declarations: [
        BlockpageComponent
    ],
    exports: [
        BlockpageComponent
    ],
    imports: [
        CommonModule,
    ]
})
export class SharedModule { }
