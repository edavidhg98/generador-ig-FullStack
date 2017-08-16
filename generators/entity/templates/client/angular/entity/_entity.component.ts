import { Component, OnInit, Inject } from '@angular/core';

import { <%= entityName.pascal %>Service } from './<%= entityName.kebab %>.service';
import { <%= entityName.pascal %> } from './<%= entityName.kebab %>.model';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-<%= entityName.kebab %>',
  templateUrl: './<%= entityName.kebab %>.component.html'
})
export class <%= entityName.pascal %>Component implements OnInit {

  <%= entityName.camel %>s: <%= entityName.pascal %>[];
  deleteModalOpts = { ok: 'OK', cancel: 'CANCEL' };

  constructor(
    private <%= entityName.camel %>Service: <%= entityName.pascal %>Service,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.<%= entityName.camel %>Service.getAll().subscribe((<%= entityName.camel %>s) => {
      this.<%= entityName.camel %>s = <%= entityName.camel %>s;
    });
  }

  openDeleteModal(content: any, id: string) {
    this.modalService.open(content).result.then((option) => {
      if (option === this.deleteModalOpts.ok) {
        this.<%= entityName.camel %>Service.delete(id).subscribe(response => {
          this.<%= entityName.camel %>s = this.<%= entityName.camel %>s.filter(<%= entityName.camel %> => <%= entityName.camel %>.id !== id);
        });
      }
    }, (reason) => {});
  }
}
