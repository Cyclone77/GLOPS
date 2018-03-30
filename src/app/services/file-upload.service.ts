import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Json } from '@glclass/json';

@Injectable()
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }

  uploadFileText(url: string, formData: FormData): Observable<string> {

    // const httpOptions = { 'responseType': 'text' };
    const headers = new HttpHeaders({
      'responseType': 'text'
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy'
    });
    // const params = new HttpParams()
    //   .set('username', 'test@example.com')
    //   .set('password', 'secret')
    //   .set('grant_type', 'password');
    const options = {
      headers
      // params,
      // withCredentials: true,
    };
    return this.httpClient.post(url, formData).pipe(
      catchError(this.handleError)
    );
  }

  uploadFileJson(url: string, formData: FormData): Observable<string> {

    return this.httpClient.post(url, formData).pipe(

      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }

}
