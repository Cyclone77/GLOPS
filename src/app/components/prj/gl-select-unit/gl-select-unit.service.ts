import { Injectable } from '@angular/core';
import { GAjaxService } from '@glservice/g-ajax.service';
import { UtilService } from '@glservice/util.service';

@Injectable()
export class GlSelectUnitService {

  // 获得机构树
  OrgTree_Select_ByParent = '/G003_GLOPS/M00002/OrgTree/Select_ByParent';

  // 查找机构
  Query_ByName = '/G003_GLOPS/M00002/OrgTree/Query_ByName';

  constructor(
    private http: GAjaxService,
    private util: UtilService
  ) { }

  // 构建url
  url(action) {
    // return this.address.ADMIN_AUTHORIZATION + `${action}?GL=${+ new Date()}`;
    return `${action}?GL=${+ new Date()}`;
  }

  // 获得功能树
  getUnitTree(parentId: string = '.') {
    return this.http.get(this.url(this.OrgTree_Select_ByParent) + `&parent=${parentId}`);
  }

  // 获得单位查找内容
  getFindUnitList(data) {
    return this.http.get(this.url(this.Query_ByName) + '&' + this.util.toQueryString(data));
  }
}
