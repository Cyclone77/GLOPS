import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// angular自带组件
import { CommonModule } from '@angular/common';

// Element UI依赖
import { ElModule } from 'element-angular';

// 布局组件
import { MainComponent } from './main.component';

import { GAjaxService } from '../services/g-ajax.service';
import { UserOption } from '../classes/user-login';
import { UserService } from '../services/user.service';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { SidebarModule } from 'primeng/primeng';
import { FindinputModule } from '@glui/findinput/findinput.module';

// 具体路由
// 1.如果把组件当作功能界面使用，（子路由）不能使用其他组件

const mainRoutes: Routes = [
  // {
  //   path: '',
  //   component: MainComponent,
  //   children: [
  //     { path: '', redirectTo: 'index', pathMatch: 'full' },
  //     { path: 'index', component: IndexComponent }
  //   ]
  // }
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'work-trend', pathMatch: 'full' },
      {
        path: 'work-trend',
        loadChildren: 'app/client/work-trend/work-trend.module#WorkTrendModule'
      },
      {
        path: 'personal-work',
        loadChildren: 'app/client/personal-work/personal-work.module#PersonalWorkModule'
      },
      {
        path: 'departments-sup',
        loadChildren: 'app/client/departments-sup/departments-sup.module#DepartmentsSupModule'
      },
      {
        path: 'client-info',
        loadChildren: 'app/client/client-info/client-info.module#ClientInfoModule'
      }
    ]
  }
];


@NgModule({
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,

    CommonModule,

    ElModule.forRoot(),
    RouterModule.forChild(mainRoutes),
    SidebarModule,
    FindinputModule
  ],
  declarations: [
    MenuComponent,
    HeaderComponent,
    MainComponent
  ],
  providers: [
    UserOption,
    GAjaxService,
    UserService
  ]
})
export class MainModule { }
