import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { <%= entityName.pascal %> } from './<%= entityName.kebab %>.model';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class <%= entityName.pascal %>Service {

  private entityUrl = 'api/<%= entityName.kebab %>s/';

  constructor(private http: Http) {

  }

<%_if(!pagination){_%>
  getAll(): Observable<any>{
    return this.http.get(this.entityUrl)
      .map(this.checkStatus)
      .map(response => response.json() as <%= entityName.pascal %>[])
      .catch(this.handleError);
  }
 <%_}else{_%>
  get(query?: any): Observable<any> {
    const params = new URLSearchParams();
    params.set('page', query.page);
    params.set('size', query.size);
    return this.http.get(this.entityUrl, { search: params })
      .map(this.checkStatus)
      .catch(this.handleError);
  }
  <%_}_%>

  getById(id: string): Observable<<%= entityName.pascal %>> {
    return this.http.get(this.entityUrl + id)
      .map(this.checkStatus)
      .map(response => response.json() as <%= entityName.pascal %>)
      .catch(this.handleError);
  }

  insert(<%= entityName.camel %>: <%= entityName.pascal %>): Observable<any> {
    return this.http.post(this.entityUrl, <%= entityName.camel %>)
      .map(this.checkStatus)
      .catch(this.handleError);
  }

  update(id: string, <%= entityName.camel %>: <%= entityName.pascal %>) {
    return this.http.put(this.entityUrl + id, <%= entityName.camel %>)
          .map(this.checkStatus)
          .catch(this.handleError);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.entityUrl + id)
      .map(this.checkStatus)
      .catch(this.handleError);
  }

  private checkStatus(response: Response) {
    const status = response.status;
    if (status === 200 || status === 201 || status === 204) {
      return response;
    }
    throw response;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.msg || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    console.log(error);
    return Observable.throw(errMsg);
  }
}
