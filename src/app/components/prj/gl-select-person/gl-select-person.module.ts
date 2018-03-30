import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlSelectPersonComponent } from './gl-select-person.component';
import { GlSelectPersonService } from './gl-select-person.service';
import { ElModule } from 'element-angular';
import { DataTableModule, CheckboxModule } from 'primeng/primeng';
import { FindinputModule } from '@glui/findinput/findinput.module';
import { GlSelectUnitModule } from '@glprj/gl-select-unit/gl-select-unit.module';
import { GlSelectPersonDlgComponent } from './gl-select-person-dlg/gl-select-person-dlg.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ElModule.forRoot(),
    DataTableModule,
    FindinputModule,
    GlSelectUnitModule,
    CheckboxModule,
    FormsModule
  ],
  exports: [ GlSelectPersonComponent, GlSelectPersonDlgComponent ],
  providers: [ GlSelectPersonService ],
  declarations: [ GlSelectPersonComponent, GlSelectPersonDlgComponent ]
})
export class GlSelectPersonModule { }
