import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserRegisterComponent } from './user-register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UtilService } from '@glservice/util.service';

const router: Routes = [
  { path: '', component: UserRegisterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    HttpClientModule
  ],
  providers: [UtilService],
  declarations: [UserRegisterComponent]
})
export class UserRegisterModule { }
