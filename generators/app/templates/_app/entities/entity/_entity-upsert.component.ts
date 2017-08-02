import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { <%= entityName.pascal %>Service } from './<%= entityName.kebab %>.service';
import { <%= entityName.pascal %> } from './<%= entityName.kebab %>.model';


@Component({
  selector: 'app-<%= entityName.kebab %>-upsert',
  templateUrl: './<%= entityName.kebab %>-upsert.component.html'
})
export class <%= entityName.pascal %>UpSertComponent implements OnInit {

  crudOperationTitle = 'Create';
  isCreate = true;
  <%= entityName.camel %>: <%= entityName.pascal %>;

  constructor(
    private <%= entityName.camel %>Service: <%= entityName.pascal %>Service,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) { // If exist id in params
        this.crudOperationTitle = 'Update';
        this.isCreate = false;
        this.<%= entityName.camel %>Service.getById(id).subscribe((<%= entityName.camel %>Data) => {
          this.<%= entityName.camel %> = <%= entityName.camel %>Data;
        });
      }
    });
  }

  registrar(formValues) {
    this.<%= entityName.camel %> = formValues;
    this.<%= entityName.camel %>Service.insert(this.<%= entityName.camel %>).subscribe(
      (response) => {
        this.router.navigate(['/entities/<%= entityName.name %>']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  actualizar() {
    this.<%= entityName.camel %>Service.update(this.<%= entityName.camel %>.id, this.<%= entityName.camel %>).subscribe(
      (response) => {
        this.router.navigate(['/entities/<%= entityName.name %>']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
