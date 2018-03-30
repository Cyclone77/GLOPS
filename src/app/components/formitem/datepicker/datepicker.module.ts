import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule
  ],
  exports: [DatepickerComponent],
  declarations: [DatepickerComponent]
})
export class DatepickerModule { }
