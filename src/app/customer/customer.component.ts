import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDataService } from '../service/data/customer/customer-data.service';
import { CompanyMinDetails } from '../shared/companyMinDetails';
import { DataService } from '../shared/Data.service';
import { CustomerTableComponent } from './table/customer-table/customer-table.component';
export class Customer {
  customerId: number;
  customerName: string;
  customerAddress: string;
  countryId: number;
  stateId: number;
  cityId: number;
  pincode: string;
  phoneNumber: string;
  email: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactMobileNumber: string;
  gstCompliant: boolean;
  gstOrVatNumber: string;
  panOrTaxNo: string;
  active: boolean;
  companyId: number;
}

@Component({
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  countries = [];
  states = [];
  cities = [];
  selectedCountry: any;
  selectedState:any;


  customerForm = this.fb.group({
    customerId: -1,
    customerName:  [null, Validators.required],
    companyId:  [null, Validators.required],
    customerAddress :  [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300),
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
    customerTypeId:  [null, Validators.required],
    phoneNumber: null,
    email: [null, [Validators.required,Validators.email]],
    primaryContactName: [null, Validators.required],
    primaryContactEmail: [null, [Validators.required, Validators.email]],
    primaryContactMobileNumber: null,
    gstCompliant: [null, Validators.required],
    gstOrVatNumber: null,
    panOrTaxNo: [null, Validators.required],
    active: [null, Validators.required],
    customerCode: null,
    description:[null,  Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1500),
    ])],
    customerLogo: null,
    logoContentLength:null,
    logoContentType:null
  });

  customerData: any;
  companies: CompanyMinDetails[];

  customerTypes:any;


  @ViewChild(CustomerTableComponent)
  private customerTableComponent: CustomerTableComponent;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  onSubmit() {

    if (this.customerForm.valid) {
      this.saveCustomer();
    } else {
      this.showSnackBar("Not a Valid Customer!");

    }

  }


  showSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  saveCustomer() {
    var customerJsonData = this.customerForm.value;



    var companyId = customerJsonData.companyId;
    customerJsonData.company = {
      companyId: companyId
    };
    console.log (JSON.stringify(customerJsonData));

    if(this.customerForm.get('customerId').value === -1) {
      this.customerDataService.createCustomer(customerJsonData)
          .subscribe (
            data => {
              console.log(data);
              this.showSnackBar('Customer created Successfully!');
              this.customerTableComponent.refresh();

              this.customerForm.reset();
              this.resetForm();
              },
            err => {
              console.log(err);
              this.showSnackBar(err.error.message);

            }
          )
    } else {
      this.customerDataService.updateCustomer(customerJsonData)
          .subscribe (
            data => {
              console.log(data);
              this.showSnackBar('Customer details Updated Successfully!');
              this.customerTableComponent.refresh();

              this.customerForm.reset();
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
     this.customerDataService.getCustomerById(row.customerId) .subscribe (
      data => {
        console.log(data);

        this.customerData = data;
        this.customerData["companyId"] = data["company"];
        delete this.customerData["company"];

        var customerTempData = this.customerData;
        customerTempData["customerLogo"] = null;
        customerTempData["logoContentType"] = null;
        customerTempData["logoContentLength"] = null;

        this.customerForm.setValue(customerTempData);
        this.getStatesByCountry(this.customerData["countryId"]);
        this.getCitiesByState(this.customerData["stateId"]);
        }
    )
  }

  resetForm() {

    this.customerForm.get('companyId').clearValidators();
    this.customerForm.get('companyId').updateValueAndValidity();

    this.customerForm.get('customerId').clearValidators();
    this.customerForm.get('customerId').updateValueAndValidity();
    this.customerForm.get('customerName').clearValidators();
    this.customerForm.get('customerName').updateValueAndValidity();
    this.customerForm.get('customerAddress').clearValidators();
    this.customerForm.get('customerAddress').updateValueAndValidity();

    this.customerForm.get('customerTypeId').clearValidators();
    this.customerForm.get('customerTypeId').updateValueAndValidity();

    this.customerForm.get('countryId').clearValidators();
    this.customerForm.get('countryId').updateValueAndValidity();

    this.customerForm.get('stateId').clearValidators();
    this.customerForm.get('stateId').updateValueAndValidity();

    this.customerForm.get('cityId').clearValidators();
    this.customerForm.get('cityId').updateValueAndValidity();

    this.customerForm.get('pincode').clearValidators();
    this.customerForm.get('pincode').updateValueAndValidity();


    this.customerForm.get('email').clearValidators();
    this.customerForm.get('email').updateValueAndValidity();


    this.customerForm.get('primaryContactName').clearValidators();
    this.customerForm.get('primaryContactName').updateValueAndValidity();

    this.customerForm.get('primaryContactEmail').clearValidators();
    this.customerForm.get('primaryContactEmail').updateValueAndValidity();

    this.customerForm.get('panOrTaxNo').clearValidators();
    this.customerForm.get('panOrTaxNo').updateValueAndValidity();

    this.customerForm.get('description').clearValidators();
    this.customerForm.get('description').updateValueAndValidity();

    this.customerForm.reset();


  }


  getCountries() {
    this.dataService.getCountries().subscribe((response) => {
      this.countries = response;
    });
  }


  getCompanies() {
    this.customerDataService.getCompanyMinDetails().subscribe((response) => {
      this.companies = response;
    });
  }

  getCustomerTypes() {
    this.customerDataService.getCustomerTypes().subscribe((response) => {
      this.customerTypes = response;
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
    this.getCountries();
    this.getCompanies();
    this.getCustomerTypes();
  }



}
