import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDataService } from '../service/data/customer/customer-data.service';
import { LoginStatusService } from '../service/login-status.service';
import { EquipmentsBySiteConfigService } from '../service/equipments-by-site-config.service';
import { StandardisedErrorCodeTableComponent } from './standardised-error-code-table/standardised-error-code-table.component';

@Component({
  selector: 'standardised-error-code',
  templateUrl: './standardised-error-code.component.html',
  styleUrls: ['./standardised-error-code.component.css']
})
export class StandardisedErrorCodeComponent implements OnInit {

  equipmentTypeList:any = [];
  equipmentCategoryList = [];
  equipmentCategoryId: any;
  messageTypeList = [{"name":"Error"}, {"name":"Warning"}, {"name":"Alert"}, {"name":"Others"}]

    standardisedErrorCodeForm = this.fb.group({

    errorCodeId : [null, Validators.required],
    errorCode : -1,
    errorMessage : [null, Validators.required],
    componentType : '',
    errorDescription : '',
    equipmentTypeId : [null, Validators.required],
    equipmentCategoryId : [null, Validators.required],
    messageType : [null, Validators.required],
    severity : -1,
    active : true,
    priority : -1,
    eiraErrorMessage : [null, Validators.required],
    approvedBy : '',
    code : ''


   
  });

  standardErrorData:any;

  @ViewChild(StandardisedErrorCodeTableComponent)
  private errorTableComponent: StandardisedErrorCodeTableComponent;


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService,
    public dialog: MatDialog,
    private loginState: LoginStatusService,
    private _equipmentsBySiteConfigService: EquipmentsBySiteConfigService
  ) {}
  onSubmit() {
    //this.saveStandardisedErrorCode();
  }

  onEdit(row) {
     this.customerDataService.getStandardisedErrorCodeById(row.errorCodeId) .subscribe (
      data => {
        console.log(data);
        this.standardErrorData = data;
      //  this.standardErrorData["siteId"] = data["site"];
      //  delete this.standardErrorData["site"];

      //  this.standardErrorData['approvedBy'] = 'eira';
      //  this.standardErrorData['addedBy'] = 'eira';

      var equipmentCategoryId = this.standardErrorData["equipmentCategoryId"];

        this.standardisedErrorCodeForm.setValue(this.standardErrorData);

        this.getEquipmentTypesByCategory(equipmentCategoryId);
         }
    )
  }



  getEquipmentTypesByCategory(equipmentCategoryId:any) {

    this.customerDataService
     .getAllEquipmentTypesByEquipmentCategory(equipmentCategoryId)
     .subscribe((response) => {
       this.equipmentTypeList = response;
     });
 }

 resetForm(){

}
 getEquipmentCategories() {
   this.customerDataService
   .getAllEquipmentCategories()
   .subscribe((response) => {
     this.equipmentCategoryList = response;
   });
 }

 getErrorCodesByCategoryId(categoryId: any) {
  console.log("Selected Site ID from Parent>>" +categoryId);
  //this._equipmentsBySiteConfigService.siteId$.next(categoryId);
  this.errorTableComponent.categoryId = categoryId;
  this.errorTableComponent.getStandardisedErrorCodeByCategoryId();

  this.getEquipmentTypesByCategory(categoryId);

}

getErrorCodesByTypeId(typeId: any) {
  console.log("Selected Site ID from Parent>>" +typeId);
  //this._equipmentsBySiteConfigService.siteId$.next(categoryId);
  this.errorTableComponent.typeId = typeId;
  this.errorTableComponent.getStandardisedErrorCodeByTypeId();

}


  ngOnInit(): void {
    this.getEquipmentCategories();

  }

}
