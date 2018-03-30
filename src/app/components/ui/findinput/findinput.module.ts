import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElModule } from 'element-angular';

import { FindinputComponent } from './findinput.component';

@NgModule({
  imports: [
    CommonModule,
    ElModule.forRoot()
  ],
  exports: [ FindinputComponent ],
  declarations: [FindinputComponent]
})
export class FindinputModule { }
