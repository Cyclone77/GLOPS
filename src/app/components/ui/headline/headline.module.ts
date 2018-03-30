import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadlineComponent } from './headline.component';

@NgModule({
  imports: [ CommonModule ],
  exports: [ HeadlineComponent ],
  declarations: [ HeadlineComponent ]
})
export class HeadlineModule { }
