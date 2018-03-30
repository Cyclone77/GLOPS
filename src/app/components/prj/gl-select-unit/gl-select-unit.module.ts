import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlSelectUnitComponent } from './gl-select-unit.component';
import { GlSelectUnitDlgComponent } from './gl-select-unit-dlg/gl-select-unit-dlg.component';
import { TreeModule } from 'primeng/primeng';
import { FindinputModule } from '@glui/findinput/findinput.module';
import { GlSelectUnitService } from './gl-select-unit.service';
import { UtilService } from '@glservice/util.service';
import { ElModule } from 'element-angular';

@NgModule({
  imports: [
    CommonModule,
    ElModule.forRoot(),
    TreeModule,
    FindinputModule
  ],
  exports: [ GlSelectUnitComponent, GlSelectUnitDlgComponent ],
  declarations: [GlSelectUnitComponent, GlSelectUnitDlgComponent],
  providers: [ GlSelectUnitService, UtilService ]
})
export class GlSelectUnitModule { }
