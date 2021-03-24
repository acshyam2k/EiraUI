import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';
//import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-file',
  template: `
    <input type="file" [formControl]="formControl" [formlyAttributes]="field"
    (change)="fileChanged($event)">
  `,
})
export class FormlyFieldFile extends FieldType {



  fileChanged(event){
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
       for (let i = 0; i < filesAmount; i++) {
       var reader = new FileReader();

       reader.onload = (event: any) => {
         console.log(event.target.result);
         debugger;
         console.log(this.formControl);
         // this.formControl.patchValue(event.target.result)
       }
       reader.readAsDataURL(event.target.files[i]);
       }

       //reader.readAsText(event.target.files[0]);
    }
 }
}
