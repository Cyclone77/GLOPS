import { Injectable } from '@angular/core';

// 异步取数
import { GAjaxService } from './../../../services/g-ajax.service';
// import { setImmediate } from 'timers';

@Injectable()
export class GLHmcTableService {


  // 表册取数
  business_GetExcelValue = '/G003_GLOPS/Extensions/HmcTable/GetExcelValue';
  // 下载表册
  business_ExportExcel = '/G003_GLOPS/Extensions/HmcTable/ExportExcel';
  // 表册页标签
  business_GetMultiTagName = '/G003_GLOPS/Extensions/HmcTable/GetMultiTagName';

  constructor(
    private http: GAjaxService
  ) { }

  // 构建url
  url(action) {
    // return this.address.ADMIN_AUTHORIZATION + `${action}?GL=${+ new Date()}`;
    return `${action}?GL=${+ new Date()}`;
  }

  // 表册取数
  businessGetExcelValue(option) {
    return this.http.post(this.business_GetExcelValue, option);
  }
  // 下载表册
  businessExportExcel(option) {
    return this.http.post(this.business_ExportExcel, option);
  }
  // 表册页标签
  businessGetMultiTagName(option) {
    return this.http.post(this.business_GetMultiTagName, option);
  }

}
