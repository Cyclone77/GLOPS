import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  private greg = {
    empty : /(^\s*)|(\s*$)/g // 用于 trim
  };
  constructor() { }

  // 把json转换为url参数
  toQueryString(object = {}, eq = '=', spl = '&') {
    const results = [];
    for (const prop in object) {
      if (object.hasOwnProperty(prop)) {
          results.push(prop + eq + object[prop]);
      }
    }
    return results.join(spl);
  }

  // 判断字符串是否为空
  isEmpty (v) {
    if (!v) { return false; }
    for (const name in v) {
        if (v.hasOwnProperty(name)) { return false; }
    }
    return true;
  }

  // 去除字符串两边的空格
  trim (v) {
    return this.isEmpty(v) ? '' : (v + '').replace(this.greg.empty, '');
  }
}
