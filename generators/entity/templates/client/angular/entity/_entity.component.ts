import { Component, OnInit, Inject } from '@angular/core';
import { DataSource } from "@angular/cdk";

import { <%= entityName.pascal %>DeleteModalComponent } from './<%= entityName.kebab %>-delete-modal.component';
import { <%= entityName.pascal %> } from './<%= entityName.kebab %>.model';
import { <%= entityName.pascal %>Service } from './<%= entityName.kebab %>.service';

import { Observable } from 'rxjs/Observable';
import { MdDialog } from "@angular/material";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-<%= entityName.kebab %>',
  templateUrl: './<%= entityName.kebab %>.component.html'
})
export class <%= entityName.pascal %>Component implements OnInit {
  displayedColumns = [ <%for (let attribute of attributes) {%> '<%= attribute.name %>', <%}%> 'actions'];

  dataSource: <%= entityName.pascal %>DataSource | null;
  <%= entityName.camel %>Database: <%= entityName.pascal %>Database | null;

  constructor(
    private <%= entityName.camel %>Service: <%= entityName.pascal %>Service,
    public dialog: MdDialog
  ) {
    this.<%= entityName.camel %>Database = new <%= entityName.pascal %>Database(this.<%= entityName.camel %>Service);
    this.dataSource = new <%= entityName.pascal %>DataSource(this.<%= entityName.camel %>Database);
   }

  ngOnInit() {
  }

  deleteEntity(id: string) {
    let dialogRef = this.dialog.open(<%= entityName.pascal %>DeleteModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === "0") {
        this.<%= entityName.camel %>Service.delete(id).subscribe((response) => {
          this.<%= entityName.camel %>Database.getData();
        });
      }
    });
  }
}

export class <%= entityName.pascal %>Database {

  dataChange: BehaviorSubject<<%= entityName.pascal %>[]> = new BehaviorSubject<<%= entityName.pascal %>[]>([]);

  constructor(private <%= entityName.camel %>Service: <%= entityName.pascal %>Service) {
    this.getData();
  }

  getData() {
    this.<%= entityName.camel %>Service.getAll().subscribe(<%= entityName.camel %>s => this.dataChange.next(<%= entityName.camel %>s));
  }
}

export class <%= entityName.pascal %>DataSource extends DataSource<<%= entityName.pascal %>> {

  constructor(private database: <%= entityName.pascal %>Database) {
    super();
  }

  connect(): Observable<<%= entityName.pascal %>[]> {
    return this.database.dataChange;
  }

  disconnect() {
  }
}
