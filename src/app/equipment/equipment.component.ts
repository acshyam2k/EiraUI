import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDataService } from '../service/data/customer/customer-data.service';
import { EquipmentsBySiteConfigService } from '../service/equipments-by-site-config.service';
import { LoginStatusService } from '../service/login-status.service';
import { EquipmentTableComponent } from './table/equipment-table/equipment-table.component';

@Component({
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {


  sites = [];

  equipmentTypeList:any = [];
  equipmentCategoryList = [];
  equipmentCategoryId: any;

  equipmentForm = this.fb.group({
    equipmentId: -1,
    equipmentCategoryId: [null, Validators.required],
    equipmentTypeId: [null],
    equipmentCode: '',
    primarySerialNumber: [null, Validators.required],
    description: ['', Validators.required],
    displayName: [null, Validators.required],
    remarks: '',
    customerReference: [null, Validators.required],
    customerNaming: [null, Validators.required],
    capacity: 0,
    purchaseDate : null,
    installationDate: null,
    warrantyExpiryDate: null,
    equipmentCategoryType: null,
    components: 0,
    disconnectRating: null,
    disconnectType: null,
    spareAvailable: null,
    status: null,
    siteId: [null, Validators.required],
    approvedBy: new FormControl({value:'Eira', disabled: true}),
    addedBy: new FormControl({value:'Eira', disabled: true}),
    active: ''
  });

  equipmentData: any;

  @ViewChild(EquipmentTableComponent)
  private equipmentTableComponent: EquipmentTableComponent;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService,
    public dialog: MatDialog,
    private loginState: LoginStatusService
  ) {}

  onSubmit() {
    if (this.equipmentForm.valid) {
      this.saveEquipment();
    }
  }


  showSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  saveEquipment() {
    var equipmentJsonData = this.equipmentForm.value;
    var site_Id = equipmentJsonData.siteId;
    equipmentJsonData.site = {
      siteId: site_Id
    };
    console.log (JSON.stringify(equipmentJsonData));
    if(this.equipmentForm.get('equipmentId').value === -1) {
      this.customerDataService.createEquipment(equipmentJsonData)
          .subscribe (
            data => {
              console.log(data);
              this.showSnackBar('New Equipment created Successfully!');
              this.equipmentTableComponent.refresh();

              this.equipmentForm.reset();
              this.resetForm();
              },
            err => {
              console.log(err);
              this.showSnackBar(err.error.message);

            }
          )
    } else {
      this.customerDataService.updateEquipment(equipmentJsonData)
          .subscribe (
            data => {
              console.log(data);
              this.showSnackBar('Equipment Details Updated Successfully!');
              this.equipmentTableComponent.refresh();
              this.equipmentForm.reset();
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
     this.customerDataService.getEquipmentById(row.equipmentId) .subscribe (
      data => {
        console.log(data);
        this.equipmentData = data;
        var equipmentCategoryId = data["equipmentCategoryId"];
        this.equipmentCategoryId = equipmentCategoryId;


        this.equipmentData['approvedBy'] = 'eira';
        this.equipmentData['addedBy'] = 'eira';
        this.equipmentForm.setValue(this.equipmentData);

        this.getEquipmentTypesByCategory(equipmentCategoryId);
         }
    )
  }

  resetForm() {
    this.equipmentForm.get('equipmentId').updateValueAndValidity();

    this.equipmentForm.get('equipmentCategoryId').clearValidators();
    this.equipmentForm.get('equipmentCategoryId').updateValueAndValidity();

    this.equipmentForm.get('equipmentTypeId').updateValueAndValidity();

    this.equipmentForm.get('primarySerialNumber').clearValidators();
    this.equipmentForm.get('primarySerialNumber').updateValueAndValidity();


    this.equipmentForm.get('displayName').clearValidators();
    this.equipmentForm.get('displayName').updateValueAndValidity();

    this.equipmentForm.get('customerReference').clearValidators();
    this.equipmentForm.get('customerReference').updateValueAndValidity();


    this.equipmentForm.get('customerNaming').clearValidators();
    this.equipmentForm.get('customerNaming').updateValueAndValidity();

    this.equipmentForm.get('siteId').clearValidators();
    this.equipmentForm.get('siteId').updateValueAndValidity();


    this.equipmentForm.get('description').clearValidators();
    this.equipmentForm.get('description').updateValueAndValidity();


    this.equipmentForm.reset();
  }
  getSites() {
    this.customerDataService.getSiteDetails().subscribe((response) => {
      this.sites = response;
    });
  }

  getEquipmentsBySiteId(siteId: any) {
    console.log("Selected Site ID from Parent>>" +siteId);
    this.equipmentTableComponent.siteId = siteId;
    this.equipmentTableComponent.refresh();

  }



  getEquipmentTypesByCategory(equipmentCategoryId:any) {

     this.customerDataService
      .getAllEquipmentTypesByEquipmentCategory(equipmentCategoryId)
      .subscribe((response) => {
        this.equipmentTypeList = response;
      });
  }


  getEquipmentCategories() {
    this.customerDataService
    .getAllEquipmentCategories()
    .subscribe((response) => {
      this.equipmentCategoryList = response;
    });
  }
  ngOnInit(): void {
    this.getSites();
    this.getEquipmentCategories();


    this.loginState.loginState$.subscribe( res => {
      console.log("Login Status>>" + res);
     });

   }



}
