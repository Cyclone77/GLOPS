import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientInfoComponent } from './client-info.component';
import { RouterModule, Routes } from '@angular/router';

const router: Routes = [
  { path: '', component: ClientInfoComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  declarations: [ClientInfoComponent]
})
export class ClientInfoModule { }
