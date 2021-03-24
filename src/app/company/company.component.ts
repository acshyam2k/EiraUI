import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDataService } from '../service/data/customer/customer-data.service';
import { DataService } from '../shared/Data.service';
import { CompanyTableComponent } from './table/company-table/company-table.component';

@Component({
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  countries = [];
  states = [];
  cities = [];
  selectedCountry: any;
  selectedState:any;


  companyForm = this.fb.group({
    companyId: -1,
    companyName:  [null, Validators.required],
    companyAddress :  [
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
    phoneNumber: null,
    email: [null, [Validators.required,Validators.email]],
    primaryContactName: [null, Validators.required],
    primaryContactEmail: [null, [Validators.required, Validators.email]],
    primaryContactMobileNumber: null,
    gstCompliant: [null, Validators.required],
    gstOrVatNumber: null,
    panOrTaxNo: [null, Validators.required],
    active: [null, Validators.required],
    companyCode: null,
    description:[null,  Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1500),
    ])],
    companyLogo: null,
    logoContentLength:null,
    logoContentType:null
  });

  companyData: any;

  @ViewChild(CompanyTableComponent)
  private companyTableComponent: CompanyTableComponent;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  onSubmit() {
    this.saveCompany();
  }


  showSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  saveCompany() {
    var companyJsonData = this.companyForm.value;

    console.log (JSON.stringify(companyJsonData));
    if(this.companyForm.get('companyId').value === -1) {
      this.customerDataService.createCompany(companyJsonData)
          .subscribe (
            data => {
              console.log(data);
              this.showSnackBar('Company created Successfully!');
              this.companyTableComponent.refresh();

              this.companyForm.reset();
              this.resetForm();
              },
            err => {
              console.log(err);
              this.showSnackBar(err.error.message);

            }
          )
    } else {
      this.customerDataService.updateCompany(companyJsonData)
          .subscribe (
            data => {
              console.log(data);
              this.showSnackBar('Company details Updated Successfully!');
              this.companyTableComponent.refresh();

              this.companyForm.reset();
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
     this.customerDataService.getCompanyById(row.companyId) .subscribe (
      data => {
        console.log(data);
        this.companyData = data;
        var companyTempData = this.companyData;

        this.companyForm.setValue(companyTempData);
        this.getStatesByCountry(this.companyData["countryId"]);
        this.getCitiesByState(this.companyData["stateId"]);
        }
    )
  }

  resetForm() {
    this.companyForm.get('companyId').clearValidators();
    this.companyForm.get('companyId').updateValueAndValidity();
    this.companyForm.get('companyName').clearValidators();
    this.companyForm.get('companyName').updateValueAndValidity();
    this.companyForm.get('companyAddress').clearValidators();
    this.companyForm.get('companyAddress').updateValueAndValidity();

    this.companyForm.get('countryId').clearValidators();
    this.companyForm.get('countryId').updateValueAndValidity();

    this.companyForm.get('stateId').clearValidators();
    this.companyForm.get('stateId').updateValueAndValidity();

    this.companyForm.get('cityId').clearValidators();
    this.companyForm.get('cityId').updateValueAndValidity();

    this.companyForm.get('pincode').clearValidators();
    this.companyForm.get('pincode').updateValueAndValidity();


    this.companyForm.get('email').clearValidators();
    this.companyForm.get('email').updateValueAndValidity();


    this.companyForm.get('primaryContactName').clearValidators();
    this.companyForm.get('primaryContactName').updateValueAndValidity();

    this.companyForm.get('primaryContactEmail').clearValidators();
    this.companyForm.get('primaryContactEmail').updateValueAndValidity();

    this.companyForm.get('panOrTaxNo').clearValidators();
    this.companyForm.get('panOrTaxNo').updateValueAndValidity();

    this.companyForm.get('description').clearValidators();
    this.companyForm.get('description').updateValueAndValidity();

    this.companyForm.reset();


  }


  getCountries() {
    this.dataService.getCountries().subscribe((response) => {
      this.countries = response;
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
  }



}
