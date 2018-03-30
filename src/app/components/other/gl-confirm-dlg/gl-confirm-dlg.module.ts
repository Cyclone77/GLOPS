import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlConfirmDlgComponent } from './gl-confirm-dlg.component';
import { GlConfirmDlgService } from './gl-confirm-dlg.service';
import { ConfirmDialogModule } from 'primeng/primeng';

@NgModule({
  imports: [ CommonModule, ConfirmDialogModule ],
  exports: [ GlConfirmDlgComponent ],
  declarations: [GlConfirmDlgComponent],
  entryComponents: [ GlConfirmDlgComponent ],
  providers: [ GlConfirmDlgService ]
})
export class GlConfirmDlgModule { }
