import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalWorkComponent } from './personal-work.component';
import { Routes, RouterModule } from '@angular/router';

const router: Routes = [
  { path: '', component: PersonalWorkComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  declarations: [PersonalWorkComponent]
})
export class PersonalWorkModule { }
