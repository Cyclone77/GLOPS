import { Injectable } from '@angular/core';
import { UserLogin, UserOption } from './../classes/user-login';
import { Json } from './../classes/json';
import { ElMessageService } from 'element-angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class BusiService {
  ModuleID: String;
  TreeType: any;
  BUSI_ID: Number;
  SetID: any;
  JOB_ID: any;
  JOB_STEP_ID: any;
  JOB_DATA_ID: any;

  constructor() {
  }
}
