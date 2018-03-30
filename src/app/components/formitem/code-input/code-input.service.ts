import { Injectable } from '@angular/core';
import { GAjaxService } from '@glservice/g-ajax.service';
import { UtilService } from '@glservice/util.service';

@Injectable()
export class CodeInputService {

  // 获得代码项
  private CodeItem_Select = '/G003_GLOPS/Core/CodeItem/Select';
  constructor(
    private http: GAjaxService,
    private util: UtilService
  ) { }

  // 构建url
  private url(action) {
    // return this.address.ADMIN_AUTHORIZATION + `${action}?GL=${+ new Date()}`;
    return `${action}?GL=${+ new Date()}`;
  }

  // 获得代码项
  getCodeItemData(data) {
    return this.http.get(this.url(this.CodeItem_Select) + '&' + this.util.toQueryString(data));
  }

  //#region 接口
  //#endregion
}
