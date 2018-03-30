import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkTrendComponent } from './work-trend.component';
import { Routes, RouterModule } from '@angular/router';
import { UdcontrolModule } from '@glui/udcontrol/udcontrol.module';
import { ElModule } from 'element-angular';
import { DataTableModule } from 'primeng/primeng';

const router: Routes = [
  { path: '', component: WorkTrendComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    ElModule.forRoot(),
    DataTableModule,
    UdcontrolModule
  ],
  declarations: [WorkTrendComponent]
})
export class WorkTrendModule { }
