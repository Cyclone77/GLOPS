import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropperComponent } from './cropper.component';

import { ElModule } from 'element-angular';

import { ImageCropperModule } from 'ng2-img-cropper';
import { CropperDlgComponent } from './cropper-dlg/cropper-dlg.component';

@NgModule({
  imports: [ CommonModule, ImageCropperModule, ElModule.forRoot() ],
  exports: [ CropperComponent, CropperDlgComponent ],
  declarations: [ CropperComponent, CropperDlgComponent ]
})
export class CropperModule { }
