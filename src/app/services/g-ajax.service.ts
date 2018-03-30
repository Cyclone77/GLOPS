import { Injectable, } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserOption } from './../classes/user-login';
import { ElMessageService } from 'element-angular';

@Injectable()
export class GAjaxService {

  // private projectpath = '/G003_GLOPS';
  myHeaderJSON = { 'Content-Type': 'application/json' };

  constructor(
    private http: HttpClient,
    private userOpt: UserOption,
    private router: Router,
    private message: ElMessageService
  ) { }

  // 构建header
  buildHeader(header) {
    this.userOpt = <UserOption>JSON.parse(localStorage.getItem('GLPROGECT_001')) || {} as UserOption;
    const headerJSON = Object.assign(
      {
        'Authorization': this.userOpt.Authorization,
         'SessionID': this.userOpt.SessionID
      }, Object.assign(this.myHeaderJSON, header));
    const httpHead = { headers: new HttpHeaders(headerJSON) };
    return httpHead;
  }

  // get方法
  get(url: string, header?: any) {
    console.log(window.location.href);
    return new Promise((resolve, reject) => {
      if (url.length === 0) {
        reject('URL不能为空！');
      }
      // url = this.projectpath + url;
      this.http.get(url, this.buildHeader(header)).subscribe(data => {
        resolve(data);
      }, (err: HttpErrorResponse)  => {
        if (err.status === 401 || err.status === 504) {
          this.redirectLogin();
        } else {
          reject(err);
        }
      });
    });
  }

  // post方法
  post(url: string, option = {}, header?: any) {
    console.log(window.location.href);
    return new Promise((resolve, reject) => {
      if (url.length === 0) {
        reject('URL不能为空！');
      }
      // url = this.projectpath + url;
      this.http.post(url, option, this.buildHeader(header)).subscribe(data => {
        resolve(data);
      }, (err: HttpErrorResponse)  => {
        if (err.status === 401 || err.status === 504) {
          this.redirectLogin();
        } else {
          reject(err);
        }
      });
    });
  }

  // 重定向到登录页
  redirectLogin() {
    const that = this;
    this.message.show('登录超时即将跳转到登录页!');
    setTimeout(function(){
      that.router.navigate(['/login']);
    }, 1000);
  }

  // 通过URL解析模块
  private analysisModule(url: string): string {
    const params = url.split('/');
    const newParams = params.filter(item => {
      if (item && item.length > 0) {
        return item;
      }
    });
    return newParams.length > 1 ? newParams[1] : '';
  }

  // 构建不同服务器API地址
  private buildURLToAddress(url: string, moduleID: string): string {
    const module = this.userOpt['MODULE'] as Array<any>;
    if (!module) {
      return url;
    }
    const module_data = module.find(item => {
      if (item['MODULE_ID'] === moduleID) {
        return item;
      }
    });
    return !!module_data ? `${module_data['MODULE_API']}${url}` : url;
  }

  // 构建URL
  private buildURL(url) {
    return this.buildURLToAddress(url, this.analysisModule(url));
  }
}
