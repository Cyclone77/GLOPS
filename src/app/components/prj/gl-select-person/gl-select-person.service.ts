import { Injectable } from '@angular/core';
import { GAjaxService } from '@glservice/g-ajax.service';
import { UtilService } from '@glservice/util.service';

@Injectable()
export class GlSelectPersonService {

  // 获取人员
  Dynamic_Select = '/G003_GLOPS/M00003/A01/GetSelPersonList';
  // 获得头像
  getPhoto = '/G003_GLOPS/Core/File/GetPersonPhoto';

  constructor(
    private http: GAjaxService,
    private util: UtilService
  ) { }

  // 构建url
  url(action) {
    // return this.address.ADMIN_AUTHORIZATION + `${action}?GL=${+ new Date()}`;
    return `${action}?GL=${+ new Date()}`;
  }

  getPersonList(data) {
    return this.http.post(this.url(this.Dynamic_Select), data);
  }

  getBusiPersonList(data) {
    return this.http.post(this.url('/G003_GLOPS/M00003/A01/GetSelBusiPersonList'), data);
  }

  // 获得人员头像
  getPersonPhoto(data) {
    return this.url(this.getPhoto) + '&' + this.util.toQueryString(data);
  }
}
