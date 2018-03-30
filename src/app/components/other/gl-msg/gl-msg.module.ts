import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrowlModule } from 'primeng/primeng';

import { GlMsgComponent } from './gl-msg.component';
import { GlMsgService } from './gl-msg.service';

@NgModule({
  imports: [ CommonModule, GrowlModule ],
  exports: [ GlMsgComponent ],
  providers: [ GlMsgService ],
  entryComponents: [ GlMsgComponent ],
  declarations: [ GlMsgComponent ]
})
export class GlMsgModule { }
