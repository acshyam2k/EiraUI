import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-form-flex',
  template: `
    <div
      [fxLayout]="to.fxLayout"
      fxLayout.xs="column"
      fxFill
      fxLayoutGap="24px"
    >
      <formly-field
        fxFlex *ngFor="let f of field.fieldGroup" [field]="f">
      </formly-field>
    </div>
  `,
})
export class FlexLayoutType extends FieldType {
}
