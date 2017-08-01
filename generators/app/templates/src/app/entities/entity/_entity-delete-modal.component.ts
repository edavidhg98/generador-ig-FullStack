import { Component } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { <%= entityName.pascal %>Component } from './<%= entityName.kebab %>.component';

@Component({
  selector: 'app-<%= entityName.kebab %>-delete-modal',
  template: `
              <div md-dialog-content>
                <h4>
                  <i class="material-icons f-size-medium fix-icon">warning</i>
                  ¿Esta seguro de eliminar este item?
                </h4>
              </div>
              <div md-dialog-actions>
                <button md-button md-dialog-close="0">Aceptar</button>
                <button md-button md-dialog-close="1">Cancelar</button>
              </div>
                `,
  styles: [`.fix-icon{ position: relative; top: 6px;}`]
})
export class <%= entityName.pascal %>DeleteModalComponent {

  constructor(public dialogRef: MdDialogRef<<%= entityName.pascal %>Component>) { }
}
