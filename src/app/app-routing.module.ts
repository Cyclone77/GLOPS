import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 具体组件
import { Page404Component } from './errorpage/page404.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'client',
    loadChildren: 'app/layout/main.module#MainModule'
  },
  {
    path: 'user-register',
    loadChildren: 'app/webapp/user-register/user-register.module#UserRegisterModule'
  },
  {
    path: 'demand-service',
    loadChildren: 'app/webapp/demand-service/demand-service.module#DemandServiceModule'
  },
  // {
  //   path: 'admin',
  //   loadChildren: 'app/admin/admin.module#AdminModule'
  // },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    Page404Component
  ]
})
export class AppRoutingModule { }
