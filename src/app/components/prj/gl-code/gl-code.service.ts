import { Injectable } from '@angular/core';
import { GAjaxService } from '@glservice/g-ajax.service';
import { UtilService } from '@glservice/util.service';

@Injectable()
export class GlCodeService {

  // 获得代码项
  CodeItem_Select = '/G003_GLOPS/Core/CodeItem/Select';

  // 获得机构树
  OrgTree_Select_ByParent = '/G003_GLOPS/M00002/OrgTree/Select_ByParent';

  // 获得机构id
  Select_ByUnitId = '/G003_GLOPS/M00002/OrgTree/Select_ByUnitId';

  // 获得部门
  Select_ByB0002ID = '/G003_GLOPS/M00002/OrgTree/Select_ByB0002ID';

  // 获得导航路径
  SelectParet_ByUnitId = '/G003_GLOPS/M00002/OrgTree/SelectParet_ByUnitId';

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

  // 获得代码项
  getCodeItemData(data) {
    return this.http.get(this.url(this.CodeItem_Select) + '&' + this.util.toQueryString(data));
  }

  // 获得单位代码
  getUnitTree(parentId: string = '.') {
    return this.http.get(this.url(this.OrgTree_Select_ByParent) + `&parent=${parentId}`);
  }

  // 获得UnitID
  getUnitId(unitId: string) {
    return this.http.get(this.url(this.Select_ByUnitId) + `&unitId=${unitId}`);
  }

  // 获得部门
  getB0002(unitId: string) {
    return this.http.get(this.url(this.Select_ByB0002ID) + `&unitId=${unitId}`);
  }

  // 获得单位路径
  getUnitIdPath(unitId: string) {
    return this.http.get(this.url(this.SelectParet_ByUnitId) + `&unitId=${unitId}`);
  }

  // 获得单位查找内容
  getFindUnitList(data) {
    return this.http.get(this.url(this.Query_ByName) + '&' + this.util.toQueryString(data));
  }
}
