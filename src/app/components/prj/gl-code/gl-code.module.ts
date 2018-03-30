import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 官方公用组件
import { FormsModule } from '@angular/forms';

// png UI
import { GrowlModule } from 'primeng/primeng';

// 基于element UI
import { ElModule } from 'element-angular';

// 组件
import { GlCodeComponent } from './gl-code.component';
import { GlCodeService } from './gl-code.service';
import { UtilService } from './../../../services/util.service';
import { FindinputModule } from '@glui/findinput/findinput.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ElModule,
    GrowlModule,
    FindinputModule
  ],
  declarations: [
    GlCodeComponent
  ],
  exports: [
    GlCodeComponent
  ],
  providers: [
    GlCodeService,
    UtilService
  ],
  entryComponents: [
    GlCodeComponent
  ]
})
export class GlCodeModule { }
