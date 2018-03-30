import { Component, OnInit } from '@angular/core';
import weui from 'weui.js';
import { ActivatedRoute } from '@angular/router';
import { DemandServeService } from './demand-serve.service';
import { Json } from '@glclass/json';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-demand-service',
  templateUrl: './demand-service.component.html',
  styleUrls: ['./demand-service.component.css'],
  providers: [DemandServeService, DatePipe]
})
export class DemandServiceComponent implements OnInit {

  // 产品列表
  ProductList = [];

  // 网络环境
  Networks = [];

  // 服务信息
  ServiceData = {
    PRODUCT: '',
    NETWORK: '',
    DESCRIPTOPN: '',
    SUBSCRIBE_TIME: ''
  };

  IS_Subscribe: '';
  File_Opt = {
    length: 0
  };
  constructor(
    private datePipe: DatePipe,
    private route_data: ActivatedRoute,
    private request: DemandServeService
  ) { }

  ngOnInit() {
    this.route_data.params.subscribe(param => {
      this.IS_Subscribe = param['subscribe'];
    });

    this.loadProductList();
    this.loadNewWork_Ment();
    this.loadErrFile();
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

  // 加载网络环境列表
  loadNewWork_Ment() {
    this.request.GetCodeItem({
      ModuleID: 'M00040',
      CodeID: 'AL'
    }).then((json: Json) => {
      if (json.IsSucceed) {
        this.Networks = json.ListData;
      }
    });
  }

  // 错误拍照上传
  loadErrFile() {
    let uploadCount = 0;
    const that = this;
    weui.uploader('#uploader', {
      url: 'http://localhost:8081',
      auto: true,
      type: 'file',
      fileVal: 'fileVal',
      compress: {
          width: 1600,
          height: 1600,
          quality: .8
      },
      onBeforeQueued: function(files) {
          // `this` 是轮询到的文件, `files` 是所有文件
          if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(this.type) < 0) {
              weui.alert('请上传图片');
              return false; // 阻止文件添加
          }
          if (this.size > 10 * 1024 * 1024) {
              weui.alert('请上传不超过10M的图片');
              return false;
          }
          that.File_Opt['length'] = files.length;
          if (files.length > 5) { // 防止一下子选择过多文件
              weui.alert('最多只能上传5张图片，请重新选择');
              return false;
          }
          if (uploadCount + 1 > 5) {
              weui.alert('最多只能上传5张图片');
              return false;
          }
          ++uploadCount;
          // return true; // 阻止默认行为，不插入预览图的框架
      },
      onQueued: function(){
          console.log(this);
          // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
          // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64
          // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
          // this.stop(); // 中断上传
          // return true; // 阻止默认行为，不显示预览图的图像
      },
      onBeforeSend: function(data, headers){
          console.log(this, data, headers);
          // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
          // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
          // return false; // 阻止文件上传
      },
      onProgress: function(procent){
          console.log(this, procent);
          // return true; // 阻止默认行为，不使用默认的进度显示
      },
      onSuccess: function (ret) {
          console.log(this, ret);
          // return true; // 阻止默认行为，不使用默认的成功态
      },
      onError: function(err){
          console.log(this, err);
          // return true; // 阻止默认行为，不使用默认的失败态
      }
   });
  }

  // 提交服务
  SubmitService() {
    const state = weui.form.validate('#form', (error) => {
      if (!error) {
        const loading = weui.loading('提交中...');

        this.request.Register({
          SetID: 'A03',
          ModuleID: 'M00040',
          Data: {
            // this.RegisterData.PRODUCT.join(',')
            A0303: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            A0301: (+ new Date()),
            A0328: this.ServiceData.NETWORK,
            A0305: this.ServiceData.PRODUCT,
            A0307: this.datePipe.transform(this.ServiceData.SUBSCRIBE_TIME, 'yyyy-MM-dd HH:mm:ss'),
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
    });
  }
}
