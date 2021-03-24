import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

import { CustomerDataService } from "../service/data/customer/customer-data.service";
import { RegionData, RegionDialogComponent } from '../shared/dialog/region-dialog/region-dialog.component';
import { SiteTableComponent } from './table/site-table/site-table.component';
import { ParentElementComponent } from '../shared/parent-element.component';
import { SiteData, SitetypeDialogComponent } from '../shared/dialog/sitetype-dialog/sitetype-dialog.component';
import { LoginStatusService } from "../service/login-status.service";
import { DataService } from "../shared/Data.service";

@Component({
  selector: "app-site",
  templateUrl: "./site.component.html",
  styleUrls: ["./site.component.css"],
})
export class SiteComponent implements OnInit, ParentElementComponent {
  customers = [];


  designations = [{ name: "Manager" }, { name: "Sr. Manager" }];

  plantTypes = [];
  siteTypes = [];
  plantCapacityList = [];
  countries = [];
  states = [];
  cities = [];
  hubs:any = [];
  selectedCountry: any;
  selectedState:any;
  panelOpenState = false;


  siteForm = this.fb.group({
    siteId: -1,
    siteTypeId: [null, Validators.required],
    plantTypeId: [null, Validators.required],
    siteName: [null, Validators.required],
    hub: null,
    siteAddress: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(150),
      ]),
    ],
    countryId: [null, Validators.required],
    stateId: [null, Validators.required],
    cityId: [null, Validators.required],
    pincode: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
    ],
    latitude: [null, Validators.required],
    longitude: [null, Validators.required],
    locationURL: [null, Validators.required],
    plantCapacity: [null, Validators.required],
    moduleDetails: [null, Validators.required],
    moduleArea: null,
    dateOfCommissioning: null,
    phoneNumber: null,
    email: [null, [Validators.required,Validators.email]],
    primaryContactName: [null, Validators.required],
    primaryContactEmail: [null, [Validators.required, Validators.email]],
    designation: null,
    primaryContactMobileNumber: null,
    gstCompliant: [null, Validators.required],
    gstOrVatNumber: null,
    panOrTaxNo: [null, Validators.required],
    active: [null, Validators.required],
    customerId: [null, Validators.required],
    siteCode:null
  });

  siteData: any;

  @ViewChild(SiteTableComponent)
  private siteTableComponent: SiteTableComponent;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService,
    private dataService:DataService,

    public dialog: MatDialog,
    private loginState: LoginStatusService
  ) {}

  onSubmit() {

    if (this.siteForm.valid) {
      this.saveSite();
    } else {
      this.showSnackBar("Not a Valid Site!");

    }
  }


  showSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  saveSite() {
    var siteJsonData = this.siteForm.value;
    var customer_Id = siteJsonData.customerId;
    siteJsonData.customer = {
      customerId: customer_Id
    };
    console.log (JSON.stringify(siteJsonData));
    if(this.siteForm.get('siteId').value === -1) {
      this.customerDataService.createSite(siteJsonData)
          .subscribe (
            data => {
              console.log(data);
              this.showSnackBar('New Site created Successfully!');
              this.siteTableComponent.refresh();

              this.siteForm.reset();
              this.resetForm();
              },
            err => {
              console.log(err);
              this.showSnackBar(err.error.message);

            }
          )
    } else {
      this.customerDataService.updateSite(siteJsonData)
          .subscribe (
            data => {
              console.log(data);
              this.showSnackBar('Site Details Updated Successfully!');
              this.siteTableComponent.refresh();

              this.siteForm.reset();
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
     this.customerDataService.getSiteById(row.siteId) .subscribe (
      data => {
        console.log(data);
        this.siteData = data;
        this.siteData["customerId"] = data["customer"];
        delete this.siteData["customer"];

        this.siteForm.setValue(this.siteData);

        this.getStatesByCountry(this.siteData["countryId"]);
        this.getCitiesByState(this.siteData["stateId"]);
        this.panelOpenState = true;
       }
    )
  }

  resetForm() {
    this.siteForm.get('customerId').clearValidators();
    this.siteForm.get('customerId').updateValueAndValidity();
    this.siteForm.get('siteName').clearValidators();
    this.siteForm.get('siteName').updateValueAndValidity();


    this.siteForm.get('siteTypeId').clearValidators();
    this.siteForm.get('siteTypeId').updateValueAndValidity();

    this.siteForm.get('plantCapacity').clearValidators();
    this.siteForm.get('plantCapacity').updateValueAndValidity();


    this.siteForm.get('latitude').clearValidators();
    this.siteForm.get('latitude').updateValueAndValidity();

    this.siteForm.get('longitude').clearValidators();
    this.siteForm.get('longitude').updateValueAndValidity();

    this.siteForm.get('locationURL').clearValidators();
    this.siteForm.get('locationURL').updateValueAndValidity();

    this.siteForm.get('siteAddress').clearValidators();
    this.siteForm.get('siteAddress').updateValueAndValidity();

    this.siteForm.get('countryId').clearValidators();
    this.siteForm.get('countryId').updateValueAndValidity();

    this.siteForm.get('stateId').clearValidators();
    this.siteForm.get('stateId').updateValueAndValidity();

    this.siteForm.get('cityId').clearValidators();
    this.siteForm.get('cityId').updateValueAndValidity();

    this.siteForm.get('pincode').clearValidators();
    this.siteForm.get('pincode').updateValueAndValidity();


    this.siteForm.get('email').clearValidators();
    this.siteForm.get('email').updateValueAndValidity();


    this.siteForm.get('primaryContactName').clearValidators();
    this.siteForm.get('primaryContactName').updateValueAndValidity();

    this.siteForm.get('primaryContactEmail').clearValidators();
    this.siteForm.get('primaryContactEmail').updateValueAndValidity();

    this.siteForm.get('panOrTaxNo').clearValidators();
    this.siteForm.get('panOrTaxNo').updateValueAndValidity();

    this.siteForm.get('moduleDetails').clearValidators();
    this.siteForm.get('moduleDetails').updateValueAndValidity();

    this.siteForm.reset();
  }
  getCustomers() {
    this.customerDataService.getAllCustomers(1).subscribe((response) => {
      this.customers = response;
    });
  }

  getPlantTypes() {
    this.customerDataService.getAllPlantTypes().subscribe((response) => {
      this.plantTypes = response;
    });
  }
  getSiteTypes() {
    this.customerDataService.getAllSiteTypes().subscribe((response) => {
      this.siteTypes = response;
    });
  }

  getPlantCapacity() {
    this.customerDataService.getAllPlantCapacity().subscribe((response) => {
      this.plantCapacityList = response;
    });
  }

  getCountries() {
    this.dataService.getCountries().subscribe((response) => {
      this.countries = response;
    });
  }


  getRegions() {
    this.customerDataService.getRegions().subscribe((response) => {
      this.hubs = response;
    });
  }

  getStatesByCountry(countryId:any) {
     this.dataService
      .getStatesByCountryId(countryId)
      .subscribe((response) => {
        this.states = response;
      });
  }

  getCitiesByState(stateId) {

    this.dataService
      .getCitiesByStateId(stateId)
      .subscribe((response) => {
        this.cities = response;
      });
  }

  ngOnInit(): void {
    this.getCustomers();
    this.getPlantTypes();
    this.getSiteTypes();
    this.getPlantCapacity();
    this.getCountries();
    this.getRegions();

    this.loginState.loginState$.subscribe( res => {
      console.log("Login Status>>" + res);
     });

   }


  openRegionDialog(): void {


    const dialogRef = this.dialog.open(RegionDialogComponent, {
      width: '350px',
      data: {regionName: '', description: '', regionId: -1}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('region details>>' + result);
      this.getRegions();

    });
  }
  openSitetypeDialog(): void {


    const dialogRef = this.dialog.open(SitetypeDialogComponent, {
      width: '350px',
      data: {sitetype: '', shortname: '', description: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('sitetype details>>' + result);
      this.getSiteTypes();

    });
  }
}
