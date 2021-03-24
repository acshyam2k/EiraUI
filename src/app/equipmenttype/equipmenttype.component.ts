import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDataService } from '../service/data/customer/customer-data.service';
import { EquipmenttypeTableComponent } from './table/equipmenttype-table/equipmenttype-table.component';

@Component({
  selector: 'app-equipmenttype',
  templateUrl: './equipmenttype.component.html',
  styleUrls: ['./equipmenttype.component.css']
})
export class EquipmenttypeComponent implements OnInit {



  equipmentTypeForm = this.fb.group({
    equipmentTypeId: -1,
    equipmentTypeCode: '',
    equipmentType: ['', Validators.required],
    equipmentCategoryId: [ '', Validators.required],
    description: ['', Validators.required],
    displayName: '',
    remarks: '',
    manufacturer: '',
    moduleType: '',
    active: ''
  });


  @ViewChild(EquipmenttypeTableComponent)
  private equipmentTypeTableComponent: EquipmenttypeTableComponent;

  equipmentCategories=[];

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService
    ) { }

  ngOnInit() {
    this.getEquipmentCategories();
  }

  onSubmit() {
    if (this.equipmentTypeForm.valid) {
      this.saveEquipmentType();
    }

  }


  showSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  saveEquipmentType() {
    var equipmentTypeJsonData = this.equipmentTypeForm.value;

    console.log (JSON.stringify(equipmentTypeJsonData));
    if(this.equipmentTypeForm.get('equipmentTypeId').value === -1) {
      this.customerDataService.createEquipmentType(equipmentTypeJsonData)
          .subscribe (
            data => {
              console.log(data);
              this.showSnackBar('Equipment Type created Successfully!');
              this.equipmentTypeTableComponent.refresh();

              this.equipmentTypeForm.reset();
              this.resetForm();
              },
            err => {
              console.log(err);
              this.showSnackBar(err.error.message);

            }
          )
    } else {
      this.customerDataService.updateEquipmentType(equipmentTypeJsonData)
          .subscribe (
            data => {
              console.log(data);
              this.showSnackBar('Equipment Type details Updated Successfully!');
              this.equipmentTypeTableComponent.refresh();

              this.equipmentTypeForm.reset();
              this.resetForm();
             },
             err => {
               console.log(err);
               this.showSnackBar(err.error.message);

             }
          )
    }
  }


  onEdit(row) {
     this.customerDataService.getEquipmentTypeById(row.equipmentTypeId) .subscribe (
      data => {
        console.log(data);
        this.equipmentTypeForm.setValue(data);
         }
    )
  }


  resetForm() {
    this.equipmentTypeForm.get('equipmentType').clearValidators();
    this.equipmentTypeForm.get('equipmentType').updateValueAndValidity();
    this.equipmentTypeForm.get('equipmentCategoryId').clearValidators();
    this.equipmentTypeForm.get('equipmentCategoryId').updateValueAndValidity();

    this.equipmentTypeForm.get('description').clearValidators();
    this.equipmentTypeForm.get('description').updateValueAndValidity();

    this.equipmentTypeForm.reset();


  }
  getEquipmentCategories() {
    this.customerDataService
    .getAllEquipmentCategories()
    .subscribe((response) => {
      this.equipmentCategories = response;
    });
  }


}
