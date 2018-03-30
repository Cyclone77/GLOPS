import { Component, OnInit, forwardRef, Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Jsonp, Headers } from '@angular/http';  /*数据请求模块*/
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventBusService } from '@glservice/event-bus.service';
import { TreeNode } from 'primeng/primeng';
import { Json } from '@glclass/json';
import { HttpRequest } from '@angular/common/http';


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  loading = false;
  treeData: TreeNode[] = [];
  selectedNode: any;
  name: string;
  selectDate = '2018-03-01';
  radioVal = 2;
  SetFields = [{
    setid: 'A01', // 指标集
    itemid: 'A0101', // 字段ID
    labeltext: '姓名', // 字段名称
    datatype: 'string', // 类型
    required: true
  }, {
    setid: 'A01',
    itemid: 'A0111',
    labeltext: '出生日期',
    datatype: 'date',
    placeholder: '输入出生日期',
    required: true
  }, {
    setid: 'A01', // 指标集
    itemid: 'A0177', // 字段ID
    labeltext: '身份证', // 字段名称
    datatype: 'string' // 类型
  }, {
    setid: 'A01',
    itemid: 'A0104',
    labeltext: '年龄',
    datatype: 'string',
    inline: false
  }, {
    setid: 'A01',
    itemid: 'B0204',
    labeltext: '公司类型',
    datatype: 'code',
    codeid: 'BD',
    moduleid: 'M00002',
    required: true
  }, {
    setid: 'A01',
    itemid: 'BZ',
    labeltext: '备注',
    datatype: 'memo',
    required: true
  }];

  field = {
    CodeID: 'AB',
    MODULE_ID: 'M00003',
    ItemName: '单位所在地',
    ItemID: 'B0140'
  };
  data = {
    B0140: '',
    B0140_CN: ''
  };
  status = true;

  FieldData = {};

  dataName = {
    name: '张三'
  };
  textarea = '';
  codevalue = '306';
  codetext = '经营性事业单位';
  @ViewChild('A0101_SetItem') A0101El;

  private headers = new Headers({ 'Content-Type': '' });
  constructor(
    private router: Router,
    private http: Http,
    private route: ActivatedRoute,
    @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder,
    private eventBus: EventBusService
  ) { }

  ngOnInit() {
    this.nodeFirstExpand(null);
    this.name = '李四';
    setTimeout(() => {
      this.FieldData = {
        A0101: '张三55',
        A0111: '2007-09-01'
      };
    }, 1000);
  }
  nodeFirstExpand(event?) {
    const treenode = [
      {
        'label': '1、组件-components',
        'data': 'Documents Folder',
        'expandedIcon': 'fa-folder-open',
        'collapsedIcon': 'fa-folder',
        'leaf': true,
        'children': [{
          'label': 'Work',
          'data': 'Work Folder',
          'expandedIcon': 'fa-folder-open',
          'collapsedIcon': 'fa-folder',
          'children': [
            {
              'label': 'Expenses.doc',
              'icon': 'fa-file-word-o',
              'data': 'Expenses Document'
            },
            {
              'label': 'Resume.doc',
              'icon': 'fa-file-word-o',
              'data': 'Resume Document'
            }
          ]
        },
        {
          'label': 'Home',
          'data': 'Home Folder',
          'expandedIcon': 'fa-folder-open',
          'collapsedIcon': 'fa-folder',
          'children': [
            {
              'label': 'Invoices.txt',
              'icon': 'fa-file-word-o',
              'data': 'Invoices for this month'
            }
          ]
        }]
      },
      {
        'label': '2、服务-services',
        'data': 'Pictures Folder',
        'expandedIcon': 'fa-folder-open',
        'collapsedIcon': 'fa-folder',
        'children': [
          { 'label': 'barcelona.jpg', 'icon': 'fa-file-image-o', 'data': 'Barcelona Photo' },
          { 'label': 'logo.jpg', 'icon': 'fa-file-image-o', 'data': 'PrimeFaces Logo' },
          { 'label': 'primeui.png', 'icon': 'fa-file-image-o', 'data': 'PrimeUI Logo' }]
      },
      {
        'label': '3、其他测试',
        'data': 'Movies Folder',
        'expandedIcon': 'fa-folder-open',
        'collapsedIcon': 'fa-folder',
        'children': [{
          'label': 'Al Pacino',
          'data': 'Pacino Movies',
          'children': [
            {
              'label': 'Scarface',
              'icon': 'fa-file-video-o',
              'data': 'Scarface Movie'
            },
            {
              'label': 'Serpico',
              'icon': 'fa-file-video-o',
              'data': 'Serpico Movie'
            }]
        },
        {
          'label': 'Robert De Niro',
          'data': 'De Niro Movies',
          'children': [
            {
              'label': 'Goodfellas',
              'icon': 'fa-file-video-o',
              'data': 'Goodfellas Movie'
            },
            {
              'label': 'Untouchables',
              'icon': 'fa-file-video-o',
              'data': 'Untouchables Movie'
            }
          ]
        }]
      }
    ];
    this.treeData = treenode;
  }

  nodeExpand(event?) {
    // this.loading = true;
    let keyId = -1;
    if (event && event.node.data.keyId) {
      keyId = event.node.data.keyId;
    }
    // this.request.mod_tree_policygroup_user(keyId).then((json: Json) => {
    //   this.loading = false;
    //   const nodes: TreeNode[] = json.Entity;
    //   if (event && event.node) {
    //     event.node.children = nodes;
    //   } else {
    //     this.treeData = nodes;
    //   }
    // });
  }

  nodeSelect(event) {
    this.eventBus.emit('SelectNode', event.node);
  }

  routerPage(path) {
    this.router.navigate([path], { relativeTo: this.route });
  }


  ValidateExtension(event) {
    return true;
  }

  changeHandle(event$) {
    const data = '';
  }

  UploadCompanyContact($scope) {
    const file = $scope.myFile;
    alert(JSON.stringify(file.name));
    const uploadUrl = './G003_GLOPS/Extensions/Excel/ImportExcel';
    const fd = new FormData();
    fd.append('file', file);
    this.http.post(uploadUrl, fd, { headers: this.headers })
      .subscribe(
        function (data) {

        },
        function () {

        }
      );
  }

  setTextarea() {
    this.textarea = '测试备注';
  }
  getNameVal() {
    console.log(this.name);
  }
  setTime() {
    this.selectDate = '2018-03-09';
  }
  setFieldsData() {
    this.FieldData = {
      A0101: '张三55',
      A0111: '2007/9/1 0:00:00',
      A0177: '110101198001015778',
      BZ: '这里是一条备注55',
      B0204: '306',
      B0204_CN: '经营性事业单位'
    };
  }

  setKeyData() {
    this.A0101El['SetVal']({
      BZ: '设置健的新值'
    });

    console.log(this.status);
  }

  SaveFieldVal(event) {
    console.log(event);
    // console.log(this.FieldData);
  }
}
