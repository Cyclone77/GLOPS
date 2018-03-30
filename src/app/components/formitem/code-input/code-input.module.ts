import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeInputComponent } from './code-input.component';
import { FormsModule } from '@angular/forms';
import { ElModule } from 'element-angular';
import { FindinputModule } from '@glui/findinput/findinput.module';
import { CodeInputService } from './code-input.service';
import { GlMsgModule } from '@glother/gl-msg/gl-msg.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ElModule.forRoot(),
    FindinputModule,
    GlMsgModule
  ],
  providers: [CodeInputService],
  exports: [CodeInputComponent],
  declarations: [CodeInputComponent]
})
export class CodeInputModule { }
