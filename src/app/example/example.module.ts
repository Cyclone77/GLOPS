import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExampleComponent } from './example.component';
import { LrcontrolModule } from '@glui/lrcontrol/lrcontrol.module';
import { GlSelectUnitModule } from '@glprj/gl-select-unit/gl-select-unit.module';
import { GlMsgModule } from '@glother/gl-msg/gl-msg.module';
import { GlConfirmDlgModule } from '@glother/gl-confirm-dlg/gl-confirm-dlg.module';
import { GlCodeModule } from '@glprj/gl-code/gl-code.module';
import { FindinputModule } from '@glui/findinput/findinput.module';
import { HeadlineModule } from '@glui/headline/headline.module';
import { CropperModule } from '@glui/cropper/cropper.module';
import { GlSelectPersonModule } from '@glprj/gl-select-person/gl-select-person.module';
import { TreeModule, DataTableModule, InputTextModule, InputSwitchModule } from 'primeng/primeng';
import { EventBusService } from '@glservice/event-bus.service';
import { RadioModule } from '@glform/radio/radio.module';
import { InputModule } from '@glform/input/input.module';
import { DatepickerModule } from '@glform/datepicker/datepicker.module';
import { TextareaModule } from '@glform/textarea/textarea.module';
import { InputEditorModule } from '@glform/input-editor/input-editor.module';
import { CodeInputModule } from '@glform/code-input/code-input.module';



const router: Routes = [
  { path: '', component: ExampleComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HeadlineModule,
    LrcontrolModule,
    RouterModule.forChild(router),
    ReactiveFormsModule,
    DataTableModule,
    InputTextModule,
    InputSwitchModule,
    GlMsgModule,
    TreeModule,
    InputModule,
    DatepickerModule,
    TextareaModule,
    RadioModule,
    InputEditorModule,
    GlCodeModule,
    CodeInputModule
  ],
  providers: [
    EventBusService
  ],
  declarations: [ExampleComponent]
})
export class ExampleModule { }

