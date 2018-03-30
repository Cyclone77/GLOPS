import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { UserService } from './../services/user.service';
import { GAjaxService } from './../services/g-ajax.service';
import { UserLogin, UserOption } from './../classes/user-login';


// ui组件
import { ElModule } from 'element-angular';

const router: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    ElModule.forRoot(),
    RouterModule.forChild(router),
    CommonModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    GAjaxService,
    UserService,
    UserLogin,
    UserOption,
  ]
})
export class LoginModule { }
