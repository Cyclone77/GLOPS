import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Json } from '../../../classes/json';
import { GlMsgService } from '@glother/gl-msg/gl-msg.service';
import { GlConfirmDlgService } from '@glother/gl-confirm-dlg/gl-confirm-dlg.service';
import { GLHmcTableService } from './gl-hmc-table.service';
import * as $ from 'jquery';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-hmc-table',
  templateUrl: './gl-hmc-table.component.html',
  styleUrls: ['./gl-hmc-table.component.css'],
  providers: [GlMsgService, GlConfirmDlgService]
})
export class GLHmcTableComponent implements OnInit {

  // 输入参数
  // tslint:disable-next-line:no-input-rename
  @Input('ModuleID') moduleId: string; // 模块ID
  // tslint:disable-next-line:no-input-rename
  @Input('ModuleDir') moduleDir: string;
  // tslint:disable-next-line:no-input-rename
  @Input('HmcName') selHmcName: string;
  // tslint:disable-next-line:no-input-rename ["正面","反面"], --->excel的各个sheet的名称,如果不传，程序自动去取，推荐自己配置
  @Input('MultiItem') multiItem: any = '';
  // tslint:disable-next-line:no-input-rename
  @Input('StartTime') startTime: Date;
  // tslint:disable-next-line:no-input-rename
  @Input('EndTime') endTime: Date;
  // tslint:disable-next-line:no-input-rename
  @Input('Personaff') personaff: Date;
  // tslint:disable-next-line:no-input-rename
  @Input('SpecialUnitID') specialUnitId: string;
  // moduleId = 'M0000C';
  // moduleDir = 'insurance';
  // selHmcName = '单位社保、公积金缴费明细表v1';

  //#region 表册
  id = '#hmcIframeTab';
  fullData: any;
  fontFields: any;
  OldCellDATA: any;
  CellDATA: any;
  // ["正面","反面"], --->excel的各个sheet的名称,如果不传，程序自动去取，推荐自己配置
  // multiItem: any;
  // 是否运行表册滚动
  allowScroll = false;
  isMulti = false;
  sheetIndex = 0;
  isTemplet = false;
  reloadRef = false;
  //#endregion

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private request: GLHmcTableService,
    private msg: GlMsgService,
    private confirm: GlConfirmDlgService
  ) { }

  // @ViewChild('hmcIframe') hmcIframeEl: ElementRef;

  ngOnInit() {
  }

  down() {
    window.location.href = '/G003_GLOPS/Extensions/HmcTable/ExportExcel?moduleId=' + this.moduleId +
      '&moduleDir=' + this.moduleDir + '&hmcName=' + this.selHmcName +
      '&personaff=' + this.personaff + '&startTime=' + this.startTime +
      '&endTime=' + this.endTime + '&specialUnitId=' + this.specialUnitId;
  }

  //#region 表册

  /* 简单模式：刷新表册，不支持编辑等复杂模式*/
  ref() {
    this.CellDATA = null;
    this.multiItem = null;
    this.loadIFrame();
  }

  loadIFrame() {
    this.isMulti ? this._loadIFrameMulti() : this._loadIFrameSingle(this.id);
  }
  // 加载单标签
  _loadIFrameSingle(id) {
    const that = this;
    let modulePage = $(id)[0];
    // 时间加1，防止和gl.ui.gauditList.js中的newid相同，导致表册随机加载不出来
    const newid = new Date().getTime() + 1;
    if (modulePage.nodeName.toLowerCase() !== 'iframe') {
      modulePage.innerHTML = ['<div id="div_Tools" style="float:right; margin-right:200px;"></div><iframe id="_zl_excel_',
        newid, '" marginwidth="0" class="excel-iframe" frameborder="0" scrolling="',
        (this.allowScroll ? 'auto' : 'no'), '"></iframe>'].join('');
      this.id = '_zl_excel_' + newid;
      modulePage = $(this.id)[0];
    }
    modulePage.style.visibility = 'hidden';
    modulePage.onload = modulePage.onreadystatechange = function () {
      if (this.contentWindow && this.contentWindow.document && (this.contentWindow.document.readyState === 'complete')) {
        this.onload = this.onreadystatechange = null;
        // 根据xml加载数据
        that.loadXmlData();
      }
    };
    const _url = [];
    _url.push(this.getRoot());
    _url.push(this.selHmcName);
    _url.push('.htm?zl=');
    _url.push(Math.random() * 10000);
    modulePage.src = _url.join('');
  }

  // 加载多标签
  _loadIFrameMulti() {
    // 取得标签信息
    if (!this.multiItem) {
      const data = {
        ModuleID: this.moduleId,
        ModuleDir: this.moduleDir,
        HmcName: this.selHmcName
      };
      this.request.businessGetMultiTagName(data).then((json: Json) => {
        if (!json.IsSucceed) {
          this.msg.error(json.Err);
        } else {
          this.multiItem = json.ListData['mitem'];
          this._creatTabHtml();
        }
      });
    } else {
      this.multiItem = this.multiItem.map(function (data, index) {
        return {
          'contentEl': 'iframe-Tab-' + index,
          'text': data
        };
      });
      this._creatTabHtml();
    }
  }
  // 创建多标签组
  _creatTabHtml() {
    if (this.multiItem && this.multiItem.length === 1) {
      this.isMulti = false;
      this._loadIFrameSingle(this.id);
      return;
    }
    const that = this;
    const html = '<div id=\'' + this.id + '-tab\'></div><div id=\'div_Tools\' style=\'float:right; margin-right:200px;\'></div>' +
      this.multiItem.map(function (data) {
        return '<iframe id=\'' + data['contentEl'] + '\' frameborder=\'0\'  class=\'ofs-stepBar-iframe\' scrolling=\'' +
          (that.allowScroll ? 'auto' : 'no') + '\'></iframe>';
      }).join('');
    $(this.id).innerHTML = html;
    const tabConfig = {
      tabs: this.multiItem,
      selectedIndex: this.sheetIndex,
      autoShowScroll: false,
      width: $(this).width - 2,
      onclick: function () {
        // my.selectIndex = that.sheetIndex;
        this._loadIFrameM('iframe-Tab-' + that.sheetIndex);
      }
    };
    // if (this.tablinks || this['tool-options']) {
    //   const temp = this['tool-options'];
    //   let items = [];
    //   items = ($.g.isArray(temp) ? temp : items.push(temp)).map(function (item) {
    //     return item;
    //   });
    //   items.forEach(function (item) {
    //     if (item.onclick) {
    //       item.onclick = item.onclick.curry(temp, that);
    //     }
    //   });
    //   tabConfig.links = items;
    // }
    // if (this.scrollBarWidth) {
    //   tabConfig.scroll = {
    //     right: 0,
    //     barWidth: this.scrollBarWidth
    //   };
    // }
    const tabObj = $(['#', this.id, '-tab'].join(''));
    tabObj.gtabBar(tabConfig);
  }
  // 处理多标签
  _loadIFrameM(id) {
    const modulePage = $(id)[0];
    // 没有加载
    if (!this.multiItem[this.sheetIndex]['load']) {
      modulePage.style.visibility = 'hidden';
      modulePage.onload = modulePage.onreadystatechange = function () {
        try {
          if (this.contentWindow && this.contentWindow.document && (this.contentWindow.document.readyState === 'complete')) {
            this.onload = this.onreadystatechange = null;
            // 如果是编辑模式，动态加载css,js
            if (this.isEdit) {
              this.loadCss();
              this.loadJS();
            }
            this.multiItem[this.sheetIndex]['load'] = true;
            // 根据xml加载数据
            this.loadXmlData();
          }
        } catch (e) { }
      };
      const _url = [];
      _url.push(this.getRoot());
      if (this.isMulti) {
        _url.push(this.selHmcName);
        // _url.push(this.filePath.replace(this.tableVersion, ""));
        _url.push('_');
        _url.push(this.sheetIndex);
        _url.push('_'); // .append(this.tableVersion);
      } else {
        _url.push(this.selHmcName);
      }
      _url.push('.htm?zl=');
      _url.push(Math.random() * 10000);
      modulePage.src = _url.join('');
    } else {
      // 对于已经加载的sheet
      $('td[c_ref=\'e\']', this.getDoc()).each(function (my) {
        let cur = $(this), name = cur.attr('name');
        let val = my.CellDATA[name];
        if (my.isLink && cur.attr('c_ct') === 'e') {
          val = '<a href=\'javascript:;\' style=\'cursor:pointer\'>' +
            (val.isEmpty ? my.EditDATA[name].linkdefaultvalue : val) + '</a>';
        }
        cur.html(val);
        cur = name = val = null;
      });
      this.loadAuotHeight();
    }
  }

  // 根据xml加载数据
  loadXmlData() {
    const that = this;
    // 如果是模版
    if (this.isTemplet) {
      that.loadHTMLData([]);
      that.loadAuotHeight();
      return;
    }
    // 对于多表，且已经加载数据[切换标签的时候]
    if (this.CellDATA && !this.reloadRef) {
      that.loadHTMLData([]);
      // 设置其宽高,显示。
      that.loadAuotHeight();
      return;
    }

    const paramData = {
      ModuleID: this.moduleId,
      ModuleDir: this.moduleDir,
      HmcName: this.selHmcName,
      StartTime: this.startTime,
      EndTime: this.endTime,
      Personaff: this.personaff,
      SpecialUnitID: this.specialUnitId
    };

    this.request.businessGetExcelValue(paramData).then((json: Json) => {
      if (!json.IsSucceed) {
        this.msg.error(json.Err);
      } else {
        const data = json.ListData;
        if (data) {
          // 全部数据
          that.fullData = data;
          that.loadHTMLData(data);
          // 设置其宽高,显示。
          that.loadAuotHeight();
          // if (my.ondatabindend)
          //   my.ondatabindend(my); //用户自定义excel数据加载结束操作
          this.msg.success('取数成功!');
        }
      }
    });

  }

  loadHTMLData(data) {
    const that = this;
    if (!this.CellDATA && !this.isTemplet) {
      data.forEach(function (item) {
        switch (item.DataType) {
          case 'cell':
            const oldcell = {};
            // tslint:disable-next-line:forin
            for (const field in item.Data) {
              oldcell[field] = item.Data[field];
            }
            that.OldCellDATA = oldcell;
            that.CellDATA = item.Data;
            break;
          case 'row':
            // isHMC = true;
            break;
          default:
            this.setOtherTag(item);
            break;
        }
      });
    }
    const rowData = this.formatRowXMLData(data);
    this.setRowData(rowData);
    this.setCellData(this.CellDATA);
  }

  formatRowXMLData(data) {
    if (!data) {
      data = [];
    }
    return data.filter(function (item) { return item.DataType === 'row'; });
  }
  // 行
  setRowData(rowData) {
    const that = this;
    // 计算高度
    const doc = $(this.getBody());
    // const rowData = data.filter(function (item) { return item.DataType === 'row'; });
    rowData.forEach(function (item) {
      // if ($.g.isUndefined(item.SheetIndex)) item.SheetIndex = 0;
      if (item.Data.length !== 0 && that.sheetIndex === parseInt(item.SheetIndex, 10)) {
        // 行增量
        if (item.Identity > 1) {
          const trTemplate = [], firstData = item.Data[0];
          firstData['序号'] = 1;
          for (let i = item.Identity; i > 0; i--) {
            const trTemp = doc.find('tr:eq(' + (item.StartRowIndex - i) + ')').clone(true);
            const first = trTemp[0];
            let singleTemplate = first && first.outerHTML ? first.outerHTML : $('<div/>').append(first).html();
            singleTemplate = singleTemplate.replace(/[\n\r]/g, '');
            trTemplate.push(singleTemplate);
            doc.find('tr:eq(' + (item.StartRowIndex - i) + ')').replaceWith(this._reSimpleStr(singleTemplate, firstData));
          }
          const tempStr = trTemplate.join('');
          const newTRStr = item.Data.map(function (childItem, index) {
            childItem['序号'] = index + 1;
            if (index === 0) {
              return '';
            }
            return this._reSimpleStr(tempStr, childItem);
          }, this).join('');
          doc.find('tr:eq(' + (item.StartRowIndex - 1) + ')').after(newTRStr);
        } else {
          const trTemp = doc.find('tr:eq(' + (item.StartRowIndex - 1) + ')').clone(true), first = trTemp[0];
          const trTemplate = first && first.outerHTML ?
            first.outerHTML : $('<div/>').append(first).html();
          const newTRStr = item.Data.map(function (childItem, index) {
            childItem['序号'] = index + 1;
            const temp = trTemplate;
            // if (this.onbindingcelldata) temp = this.onbindingcelldata(childItem, temp, trTemp);
            return that._reSimpleStr(temp, childItem);
          }, this).join('');
          doc.find('tr:eq(' + (item.StartRowIndex - 1) + ')').replaceWith(newTRStr);
        }
      }
    });

    // }
  }
  // 单元格
  setCellData(data) {
    const bodyBrowse = this.getBody();
    const reg = /:[\n|\r]?\s*\.5pt/img;
    const html = bodyBrowse.innerHTML;
    const style = this.getDoc().getElementsByTagName('style')[0];
    // if (this.isChrome) {
    //   html = html.replace(reg, ":1pt");
    //   style.innerHTML = "td{white-space:nowrap;}\n\r" + style.innerHTML.replace(reg, ":1pt")
    // }
    $('head').append('<style type="text/css">td{overflow:hidden}</style>');

    bodyBrowse.innerHTML = this._reImgSizeStr(html, data, null, false, this);
  }
  // 设置操作标志【t:DataType+i:所在索引】
  setOtherTag(data) {
    const bodyBrowse = this.getBody();
    const t = data.DataType;
    data.OtherFields.forEach(function (item, index) {
      $('td:contains(\'[@' + item.name + ']\')', bodyBrowse).attr({ 't': t, 'i': index });
    });
  }
  // 自动计算高度
  loadAuotHeight() {
    const doc = this.getDoc();
    let h = (doc.compatMode === 'CSS1Compat' ? doc.documentElement.scrollHeight : doc.body.scrollHeight) + 20;
    $(this.getifrID()).css({ 'visibility': 'visible', 'height': h + 'px' });
    if (this.isMulti) {
      h = h + 41;
      $(this.id).style.height = h + 'px';
    }
    // if (this.onSetParentIframeHeight) {
    //     this.onSetParentIframeHeight(h);
    //     // return;
    // }
    // if (this.isCustomScroll) {
    //     this.buildScollControl();
    //     this.setCustomScroll(doc);
    // }

  }
  // 窗体body标签,取html内容用
  getBody() {
    return this.getDoc().body;
  }
  // document context，上下文，
  getDoc() {
    return $(this.getifrID())[0].contentDocument;
  }
  // 取得当前iframe ID
  getifrID() {
    return this.isMulti ? ('#hmcIframeTab' + this.sheetIndex) : this.id;
  }
  // 文本串，替换对象，正则表达式，如果没有对应值，是否显示标志还是""
  _reImgSizeStr(text, obj, Match, showMatchStr, my) {
    const that = this;
    // 图像，特定字体大小
    return text.replace((Match || /\[[@!](.+?)\]/g), function (match, key) {
      if (my.imgFields && (key in my.imgFields)) {
        return '<img src=\'\' field=\'' + key + '\' style=\'width:0px;height:0px;\'/>';
      }
      if (key.lastIndexOf('_Url') > -1) {
        if (!my.imgFields) {
          my.imgFields = {};
        }
        if (!my.imgFields[key]) {
          my.imgFields[key] = { 'isCellImg': true };
        }
        return '<img src=\'\' field=\'' + key + '\' style=\'width:0px;height:0px;\'/>';
      }
      if (that.fontFields && that.fontFields.include(key)) {
        return '<span style=\'font-size:' + obj[key + '_FontSize'] + 'pt\' >' + obj[key] + '</span>';
      }
      return (obj && (key in obj)) ? obj[key] : (showMatchStr ? match : '');
    });
  }
  // 简单替换
  _reSimpleStr(text, obj) {
    return text.replace(/\[[@!]([^\]!@]+)\]/g, function (match, key) { return obj[key] || ''; });
  }
  getRoot() {
    // const strFullPath = window.document.location.href;
    // const strPath = window.document.location.pathname;
    // const pos = strFullPath.indexOf(strPath);
    // const prePath = strFullPath.substring(0, pos);
    // const postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    // return prePath + postPath + '/assets/table/' + this.moduleDir + '/';
    return 'assets/table/' + this.moduleDir + '/';
  }

  //#endregion
}
