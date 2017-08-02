import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { <%= entityName.pascal %> } from './<%= entityName.kebab %>.model';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class <%= entityName.pascal %>Service {

  private entityUrl = 'api/<%= entityName.camel %>s/';

  constructor(private http: Http) {

  }

  getAll(): Observable<<%= entityName.pascal %>[]> {
    return this.http.get(this.entityUrl)
      .map(this.checkStatus)
      .map(this.extractEntities);
  }

  getById(id: string): Observable<<%= entityName.pascal %>> {
    return this.http.get(this.entityUrl + id)
      .map(this.checkStatus)
      .map(this.extractEntity);
  }

  insert(<%= entityName.camel %>: <%= entityName.pascal %>): Observable<any> {
    return this.http.post(this.entityUrl, <%= entityName.camel %>)
      .map(this.checkStatus);
  }

  update(id: string, <%= entityName.camel %>: <%= entityName.pascal %>) {
    return this.http.put(this.entityUrl + id, <%= entityName.camel %>).map(this.checkStatus);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.entityUrl + id)
      .map(this.checkStatus);
  }

  private checkStatus(response: Response) {
    const status = response.status;
    if (status === 200 || status === 201 || status === 204) {
      return response;
    }
    throw response;
  }

  private extractEntities = (response: Response): <%= entityName.pascal %>[] => {
    return response.json().map(this.convertTo<%= entityName.pascal %>);
  }

  private extractEntity = (response: Response): <%= entityName.pascal %> => {
    return this.convertTo<%= entityName.pascal %>(response.json());
  }

  private convertTo<%= entityName.pascal %> = (data): <%= entityName.pascal %> => {
    <%
      let attributesKeys = Object.keys(attributes);
      let finalLength = attributesKeys.length;
      let counter = 1;
    %>const <%= entityName.camel %>: <%= entityName.pascal %> = {
      id: data._id,<%attributesKeys.forEach((attributeKey) => {%>
      <%=attributeKey%>: data.<%=attributeKey%><%if(counter++ < finalLength) {%>,<%}%><%});%>
    };
    return <%= entityName.camel %>;
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
