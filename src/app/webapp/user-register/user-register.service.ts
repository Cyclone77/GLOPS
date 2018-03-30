import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UtilService } from '@glservice/util.service';

@Injectable()
export class UserRegisterService {

  private myHeaderJSON = { 'Content-Type': 'application/json' };
  constructor(
    private http: HttpClient,
    private util: UtilService
  ) { }

  // 构建header
  private buildHeader() {
    return  { headers: new HttpHeaders(this.myHeaderJSON) };
  }

  // 构建url
  url(action) {
    // return this.address.ADMIN_AUTHORIZATION + `${action}?GL=${+ new Date()}`;
    return `${action}?GL=${+ new Date()}`;
  }

  // 获得代码项
  GetCodeItem(data) {
    let url = '/G003_GLOPS/NotVerify/NotVerifyCodeItem/Select';
    url = this.url(url) + '&' + this.util.toQueryString(data);
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:no-shadowed-variable
      this.http.get(url, this.buildHeader()).subscribe(data => {
        resolve(data);
      }, (err: HttpErrorResponse)  => {
        reject(err);
      });
    });
  }

  // 注册
  Register(data) {
    const url = '/G003_GLOPS/NotVerify/NotVerifyDynamic/Insert';
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:no-shadowed-variable
      this.http.post(url, data, this.buildHeader()).subscribe(data => {
        resolve(data);
      }, (err: HttpErrorResponse)  => {
        reject(err);
      });
    });
  }
}
