import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ElModule } from 'element-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  TreeModule, DataTableModule, ButtonModule, InputTextModule, TabViewModule, CheckboxModule,
  GrowlModule, DialogModule, PickListModule, DropdownModule, ToolbarModule, CalendarModule, FileUploadModule, ListboxModule, PanelModule
} from 'primeng/primeng';

import { HeadlineModule } from '@glui/headline/headline.module';
import { LrcontrolModule } from '@glui/lrcontrol/lrcontrol.module';
import { UdcontrolModule } from '@glui/udcontrol/udcontrol.module';
import { GlCodeModule } from '@glprj/gl-code/gl-code.module';

import { GlSelectUnitModule } from '@glprj/gl-select-unit/gl-select-unit.module';
import { GlMsgModule } from '@glother/gl-msg/gl-msg.module';
import { GlConfirmDlgModule } from '@glother/gl-confirm-dlg/gl-confirm-dlg.module';
import { FindinputModule } from '@glui/findinput/findinput.module';
import { CropperModule } from '@glui/cropper/cropper.module';

import { GLHmcTableComponent } from './gl-hmc-table.component';
import { GLHmcTableService } from './gl-hmc-table.service';


@NgModule({
  imports: [
    CommonModule,
    ElModule.forRoot(),
    TabViewModule,
    ButtonModule,
    DropdownModule,
    GrowlModule,
    ToolbarModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
    PanelModule,
    FileUploadModule,
    ListboxModule,
    ReactiveFormsModule,
    DataTableModule,
    HeadlineModule,
    LrcontrolModule,
    UdcontrolModule,
    GlCodeModule,
    CommonModule,
    GlSelectUnitModule,
    GlMsgModule,
    GlConfirmDlgModule,
    FindinputModule,
    CropperModule
  ],
  declarations: [
    GLHmcTableComponent
  ],
  providers: [
    GLHmcTableService
  ],
  exports: [
    GLHmcTableComponent
  ],
  entryComponents: [
    GLHmcTableComponent
  ]
})
export class GLHmcTableModule { }
