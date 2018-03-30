import { Component, OnInit } from '@angular/core';
import weui from 'weui.js';
import { UserRegisterService } from './user-register.service';
import { Json } from '@glclass/json';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  providers: [UserRegisterService, DatePipe]
})
export class UserRegisterComponent implements OnInit {

  // 注册信息
  RegisterData = {
    UNIT_NAME: '',
    AREA: '',
    USER_NAME: '',
    PHONE: '',
    PRODUCT: [],
    OPEN_ID: '123'
  };
  // 产品列表
  ProductList = [];

  // 地区名称
  Area_Name: string;
  AreaList = [];
  AreaList_hier = [];
  edit: string;
  constructor(
    private datePipe: DatePipe,
    private route_data: ActivatedRoute,
    private request: UserRegisterService
  ) { }

  ngOnInit() {
    this.route_data.params.subscribe(param => {
      this.edit = param['edit'];
    });
    this.loadProductList();
    this.loadAreaData();
  }

  // 加载产品列表
  loadProductList() {
    this.request.GetCodeItem({
      ModuleID: 'M00040',
      CodeID: 'AB'
    }).then((json: Json) => {
      if (json.IsSucceed) {
        this.ProductList = json.ListData;
      }
    });
  }

  // 选择产品
  SelectProduct(val, checked) {
    if (checked) {
      this.RegisterData.PRODUCT.push(val);
    } else {
      const index = this.RegisterData.PRODUCT.findIndex(item => {
        return item === val;
      });
      this.RegisterData.PRODUCT.splice(index, 1);
    }
  }

  // 加载地区列表
  loadAreaData() {
    this.request.GetCodeItem({
      ModuleID: 'M00040',
      CodeID: 'AA'
    }).then((json: Json) => {
      if (json.IsSucceed) {
        this.AreaList = json.ListData;
        this.buildAreaHierarchy('.', this.AreaList_hier);
        // console.log(this.AreaList_hier);
      }
    });
  }

  // 处理地区层级关系
  buildAreaHierarchy(parent: string = '.', list: Array<any> = []) {
    this.AreaList.forEach(item => {
      if (item.PARENT === parent) {
        const data = {
          label: item.ITEM_NAME,
          value: item.ITEM_ID,
          children: []
        };
        list.push(data);
        if (item.CHILD) {
          this.buildAreaHierarchy(item.ITEM_ID, data.children);
        }
      }
    });
  }

  // 选择地区
  SelectArea() {
    if (this.AreaList_hier.length === 0) {
      return;
    }
    // 级联picker
    weui.picker(this.AreaList_hier, {
      className: 'custom-classname',
      container: 'body',
      defaultValue: [51, 5101, 510101],
      depth: 3,
      onChange: (result) => {
        // console.log(result);
      },
      onConfirm: (result) => {
        // console.log(result);
        this.RegisterData['AREA'] = result[result.length - 1]['value'];
        this.Area_Name = result[result.length - 1]['label'];
      },
      id: 'doubleLinePicker'
    });
  }

  // 注册
  RegisterEvent() {
    const state = weui.form.validate('#form', (error) => {
      if (!error) {
        const loading = weui.loading('保存中……', {
          className: 'custom-classname'
        });
        // window.close();
        this.request.Register({
          SetID: 'A02',
          ModuleID: 'M00040',
          Data: {
            // this.RegisterData.PRODUCT.join(',')
            H0202: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            H0203: this.RegisterData.AREA,
            H0204: this.RegisterData.UNIT_NAME,
            H0205: this.RegisterData.USER_NAME,
            H0206: this.RegisterData.PHONE,
            H0207: this.RegisterData.PRODUCT.join(','),
          }
        }).then((json: Json) => {
          if (json.IsSucceed) {
            loading.hide(function () {
              weui.toast('操作成功', 3000);
              if (window['WeixinJSBridge']) {
                window['WeixinJSBridge'].call('closeWindow');
              }
            });
          }
        });
      }
    }, {
      regexp: {
        IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/}
    });
  }
}
