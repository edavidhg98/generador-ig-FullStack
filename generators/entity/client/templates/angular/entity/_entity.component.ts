import { Component, OnInit, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { <%= entityName.pascal %>Service } from './<%= entityName.kebab %>.service';
import { <%= entityName.pascal %> } from './<%= entityName.kebab %>.model';

@Component({
  selector: 'app-<%= entityName.kebab %>',
  template: `
              <div class="container-fluid">
                <app-<%= entityName.kebab %>-list [<%= entityName.camel %>s]="<%= entityName.camel %>s"></app-<%= entityName.kebab %>-list>


                <%_ if(pagination || paginationGlobal){ _%>
                <div class="row justify-content-center" *ngIf="<%= entityName.camel %>s && <%= entityName.camel %>s.length">
                <ngb-pagination [collectionSize]="totalElements" [(page)]="page"
                [pageSize]="elementsPerPage" [boundaryLinks]="true"
                (pageChange)="loadAll()"></ngb-pagination>
                </div>
                <%_}_%>
              </div>
            `
})
export class <%= entityName.pascal %>Component implements OnInit {
  page: any;
  totalElements: any;
  elementsPerPage: any;
  <%= entityName.camel %>s: <%= entityName.pascal %>[] = [];

  constructor(private <%= entityName.camel %>Service: <%= entityName.pascal %>Service) {
    this.page = 1;
    <%_ if(pagination){ _%>
      this.elementsPerPage = <%= pagination.elementsPerPage %>;
    <%_ } else if(paginationGlobal){ _%>
      this.elementsPerPage = <%= paginationGlobal.elementsPerPage %>;
    <%_ } else { _%>
      this.elementsPerPage = 10;
    <%_ } _%>
  }

  ngOnInit() {
    this.loadAll();
  }
   private loadAll() {
     <%_if(!pagination){_%>
      this.<%= entityName.camel %>Service.getAll().subscribe(<%= entityName.camel %>s => this.<%= entityName.camel %>s = <%= entityName.camel %>s);
      <%_}else{_%>
        const query = { page: this.page - 1, size: this.elementsPerPage };
        this.<%= entityName.camel %>Service.get(query).subscribe((response: Response) => {
        this.<%= entityName.camel %>s = response.json().<%= entityName.camel %>s as <%= entityName.pascal %>[];
        this.totalElements = response.headers.get('X-Total-Count');
      });
      <%_}_%>
  }
}
