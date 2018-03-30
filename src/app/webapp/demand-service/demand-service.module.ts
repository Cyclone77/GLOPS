import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandServiceComponent } from './demand-service.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UtilService } from '@glservice/util.service';
import { HttpClientModule } from '@angular/common/http';

const router: Routes = [
  { path: '', component: DemandServiceComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    HttpClientModule
  ],
  providers: [UtilService],
  declarations: [DemandServiceComponent]
})
export class DemandServiceModule { }
