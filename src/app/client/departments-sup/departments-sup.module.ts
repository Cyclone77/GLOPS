import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsSupComponent } from './departments-sup.component';
import { Routes, RouterModule } from '@angular/router';

const router: Routes = [
  { path: '', component: DepartmentsSupComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  declarations: [DepartmentsSupComponent]
})
export class DepartmentsSupModule { }
