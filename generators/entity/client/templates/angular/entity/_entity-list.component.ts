import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { <%= entityName.pascal %>Service } from './<%= entityName.kebab %>.service';
import { <%= entityName.pascal %> } from './<%= entityName.kebab %>.model';
import { absolutePath } from './<%= entityName.kebab %>.route';

@Component({
  selector: 'app-<%= entityName.kebab %>-list',
  templateUrl: './<%= entityName.kebab %>-list.component.html'
})
export class <%= entityName.pascal %>ListComponent implements OnInit {

  @Input() <%= entityName.camel %>s: <%= entityName.pascal %>[];
  deleteModalOpts = { ok: 'OK', cancel: 'CANCEL' };

  absolutePath: string = absolutePath;

  constructor(
    private <%= entityName.camel %>Service: <%= entityName.pascal %>Service,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
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
