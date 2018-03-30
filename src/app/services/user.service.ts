import { Injectable } from '@angular/core';
import { UserLogin, UserOption } from './../classes/user-login';
import { Json } from './../classes/json';
import { ElMessageService } from 'element-angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Base64 } from 'js-base64';
import { Password } from 'primeng/primeng';

@Injectable()
export class UserService {
  // private projectpath = '/324.CDSDJT';
  loginUrl = '/G003_GLOPS/Core/UserLogon/Login';
  logoutUrl = '/G003_GLOPS/Core/UserLogon/Logout';
  // loginUrl = '/G003_GLOPS/Core/UserLogon/Login';
  // logoutUrl = '/G003_GLOPS/Core/UserLogon/Logout';
  notLoginHeaderJSON = { 'Content-Type': 'application/json' };
  loginHeaderJSON = {};
  loginMsg = {msg: '', type: ''};

  userOpt = {} as UserOption;
  constructor(
    private http: HttpClient,
    private message: ElMessageService
  ) {
  }

  login(user: UserLogin) {
    return new Promise((resolve, reject) => {
      // if (!window.location.href.includes('localhost')) {
      //   this.loginUrl = this.projectpath + this.loginUrl;
      // }
      const encodePsw = Base64.encode(user.Password);

      const encodeUserData: UserLogin = {
        UserAccount: user.UserAccount,
        Password:  Base64.encode(encodePsw)
      };
      this.http.post(this.loginUrl, encodeUserData, this.getHttpHeader(this.notLoginHeaderJSON)).subscribe((json: Json) => {
        if (json.IsSucceed) {
          Object.assign(this.userOpt, json.Data);
          this.setHeaderParams();
          resolve();
        } else {
          console.log(json.Err);
          if (json && json.Err) {
            this.loginMsg.msg = '帐号或密码不正确!';
            this.loginMsg.type = 'inputErr';
          } else {
            this.loginMsg.msg = '帐号或密码不正确!';
            this.loginMsg.type = 'inputErr';
          }
        }
      }, (err: HttpErrorResponse)  => {
        console.log(err);
        if (err && err.status) {
          switch (err.status) {
            case 504:
            this.loginMsg.msg = '服务器响应超时!';
            this.loginMsg.type = 'respondErr';
            break;
            case 503:
            this.loginMsg.msg = '数据库连接失败!';
            this.loginMsg.type = 'respondErr';
            break;
            default:
            this.loginMsg.msg = '帐号或密码不正确!';
            this.loginMsg.type = 'inputErr';
          }
        } else {
          this.loginMsg.msg = '帐号或密码不正确!';
          this.loginMsg.type = 'inputErr';
        }
      });
    });
  }

  logout() {
    this.getHeaderParams();
    return new Promise((resolve, reject) => {
      // if (!window.location.href.includes('localhost')) {
      //   this.loginUrl = this.projectpath + this.loginUrl;
      // }
      this.http.post(this.logoutUrl, null, this.getHttpHeader(this.loginHeaderJSON)).subscribe((json: Json) => {
        if (json.IsSucceed) {
          resolve();
        } else {
          console.log(json.Err);
          this.message.show(json.Err);
          resolve();
          // reject(json.Err);
        }
      }, (err: HttpErrorResponse)  => {
        console.log(err);
        this.message.show('未获取到用户信息,可能帐号已退出登录!');
        resolve();
      });
    });

  }

  getHttpHeader(jsonData: any) {
    return { headers: new HttpHeaders(jsonData) };
  }

  setHeaderParams() {
    this.userOpt.Authorization = this.userOpt['Token_type'] + ' ' + this.userOpt.Access_token;
    let sessionID = this.userOpt.SessionID;
    sessionID = '';
    localStorage.setItem('GLPROGECT_001', JSON.stringify(this.userOpt));
  }

  getHeaderParams() {
    const data = JSON.parse(localStorage.getItem('GLPROGECT_001'));
    if (!data) {
      this.message.show('未获取到用户数据!');
    }
    this.loginHeaderJSON['Authorization'] = data.Authorization;
    this.loginHeaderJSON['SessionID'] = data.SessionID;
  }
}
