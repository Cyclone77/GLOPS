import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputEditorComponent } from './input-editor.component';
import { InputModule } from '@glform/input/input.module';
import { DatepickerModule } from '@glform/datepicker/datepicker.module';
import { TextareaModule } from '@glform/textarea/textarea.module';
import { FormsModule } from '@angular/forms';
import { CodeInputModule } from '@glform/code-input/code-input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    DatepickerModule,
    TextareaModule,
    CodeInputModule
  ],
  exports: [InputEditorComponent],
  declarations: [InputEditorComponent]
})
export class InputEditorModule { }
