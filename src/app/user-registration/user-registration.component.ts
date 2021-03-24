import { Component, OnInit } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { map, startWith, switchMap, tap } from "rxjs/operators";
import { CompanyComponent } from "../company/company.component";
import { CustomerDataService } from "../service/data/customer/customer-data.service";
import { UserData, UserDataObjectService } from "../service/user-data-object.service";
import { Company } from "../shared/companyDetails";
import { DataService } from "../shared/Data.service";
import { User } from "../shared/UserDetails";

export interface StepType {
  label: string;
  fields: FormlyFieldConfig[];
}


@Component({
  selector: "app-user-registration",
  templateUrl: "./user-registration.component.html",
  styleUrls: ["./user-registration.component.scss"],
})
export class UserRegistrationComponent implements OnInit {
  countries = [];
  states = [];
  cities = [];
  selectedCountry = -1;
  selectedState = -1;
  userData: UserData;
  user: User;
  customerTypes:any;

  ngOnInit(): void {
    this.userData = this.userDataObjectService.getUserData();
    console.log("User Data::" + JSON.stringify(this.userData));
  }

  constructor(
    private dataService: DataService,
    private customerDataService: CustomerDataService,
    private snackBar: MatSnackBar,
    private userDataObjectService: UserDataObjectService
  ) {}


  getCustomerTypes() {
    this.customerDataService.getCustomerTypes().subscribe((response) => {
      this.customerTypes = response;
      return this.customerTypes;
    });
  }
  activedStep = 0;

  model= {};
  steps: StepType[] = [
    {
      label: "Company Information",
      fields: [
        {
          key: "companyName",
          type: "input",
          templateOptions: {
            label: "What is your Company Name?",
            required: true,
          },
        },

        {
          key: "customerType",
          type: "select",
          templateOptions: {
            label: "What is your Company Type?",
            options: this.dataService.getCustomerTypes(),
            valueProp: "customerTypeId",
            labelProp: "customerType",
            required: true,
          },
        },

        {
          key: "primaryCustomerList",
          type: "input",
          templateOptions: {
            label: "Who are your Primary Customer?",
          },
        },

        {
          key: "customerReferenceNumber",
          type: "input",
          templateOptions: {
            label: "What is your Customer Reference Number?",
          },
        },

        {
          type: "flex-layout",

          templateOptions: {
            fxLayout: "row",
          },
          fieldGroup: [
            {
              key: "ponumber",
              type: "input",
              templateOptions: {
                label: "Enter your PO Number",
              },
            },
            {
              key: "poDate",
              type: "datepicker",
              templateOptions: {
                label: "Enter your PO Date",
              },
            },
          ],
        },

        {
          key: "hasWebSite",
          type: "checkbox",
          templateOptions: {
            label: "Do you have a WebSite?",
            required: true,
            pattern: "true",
          },
        },
        {
          key: "webSiteURL",
          type: "input",
          templateOptions: {
            label: "Enter your Website Link",
            required: true,
          },
        },

        {
          key: "description",
          type: "textarea",
          templateOptions: {
            label: "Description",
            placeholder: "Please provide Description.",
          },
        },

        {
          key: "logo",
          type: "file",
          templateOptions: {
            label: "Company Logo",
          },
        },
      ],
    },

    {
      label: "Personal Information",
      fields: [
        {
          type: "flex-layout",

          templateOptions: {
            fxLayout: "row",
          },
          fieldGroup: [
            {
              key: "firstName",
              type: "input",
              templateOptions: {
                label: "Your First Name.",
                required: true,
              },
            },
            {
              key: "lastName",
              type: "input",
              templateOptions: {
                label: "Your Last Name.",
                required: true,
              },
            },
          ],
        },

        {
          key: "primaryContactMobileNumber",
          type: "input",
          templateOptions: {
            label: "Mobile Number",
            required: true,
          },
        },

        {
          type: "flex-layout",

          templateOptions: {
            fxLayout: "row",
          },
          fieldGroup: [
            {
              key: "primaryContactEmail",
              type: "input",
              templateOptions: {
                label: "Email Id",
              },
            },
            {
              key: "phoneNumber",
              type: "input",
              templateOptions: {
                label: "Phone Number",
              },
            },
          ],
        },
      ],
    },

    {
      label: "Location & Finacial Information",
      fields: [
        {
          key: "companyAddress",
          type: "input",
          templateOptions: {
            label: "Address",
            placeholder: "Plot no., Street Name and Number.",

            required: true,
          },
        },

        {
          type: "flex-layout",

          templateOptions: {
            fxLayout: "row",
          },
          fieldGroup: [
            {
              key: "countryId",
              type: "select",
              templateOptions: {
                label: "Select Country.",
                options: this.dataService.getCountries(),
                valueProp: "countryId",
                labelProp: "countryName",
              },
            },

            {
              key: "stateId",
              type: "select",
              templateOptions: {
                label: "Select State.",
                options: [],
                valueProp: "stateId",
                labelProp: "stateName",
              },

              hooks: {
                onInit: (field) => {
                  field.templateOptions.options = field.form
                    .get("countryId")
                    .valueChanges.pipe(
                      switchMap((countryId) =>
                        this.dataService.getStatesByCountryId(countryId)
                      )
                    );
                },
              },
            },
          ],
        },

        {
          type: "flex-layout",

          templateOptions: {
            fxLayout: "row",
          },
          fieldGroup: [
            {
              key: "cityId",
              type: "select",
              templateOptions: {
                label: "Select City.",
                options: [],
                valueProp: "cityId",
                labelProp: "cityName",
              },

              hooks: {
                onInit: (field) => {
                  field.templateOptions.options = field.form
                    .get("stateId")
                    .valueChanges.pipe(
                      switchMap((stateId) =>
                        this.dataService.getCitiesByStateId(stateId)
                      )
                    );
                },
              },
            },

            {
              key: "pincode",
              type: "input",
              templateOptions: {
                label: "Postal Code",
              },
            },
          ],
        },

        {
          key: "gstCompliant",
          type: "checkbox",
          templateOptions: {
            label: "Do you have GST No?",
            pattern: "true",
          },
        },

        {
          key: "gstOrVatNumber",
          type: "input",
          templateOptions: {
            label: "GST No.",
          },
        },

        {
          key: "panOrTaxNo",
          type: "input",
          templateOptions: {
            label: "PAN No.",
          },
        },
      ],
    },
  ];

  form = new FormArray(this.steps.map(() => new FormGroup({})));
  options = this.steps.map(() => <FormlyFormOptions>{});

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

  showSnackBar(msg: any) {
    this.snackBar.open(msg, "Close", {
      duration: 2000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }

  submit() {
    console.log(JSON.stringify(this.model));

    var companyData  = this.model;
    companyData["email"] = this.model["primaryContactEmail"];
    this.user = {
      userName : this.userData.username,
      emailid : this.model["primaryContactEmail"],
      mobilenumber : this.model["primaryContactMobileNumber"],
      firstName : this.model["firstName"],
      lastName : this.model["lastName"],
      designation : "",
      encryptedpassword : this.userData.password,
      dateofbirth : "",
      address : this.model["companyAddress"],
      countryid : this.model["countryId"],
      stateid : this.model["stateId"],
      cityid : this.model["cityId"],
      companyid : -1,
      customerid : -1,
      active : true
    };

    const dataObject = {
      user: this.user,
      company: companyData
    }

    this.customerDataService.completeUserRegistration(dataObject).subscribe(
      (data) => {
        console.log(data);
        this.showSnackBar("User Registered Successfully!");
      },
      (err) => {
        console.log(err);
        this.showSnackBar(err.error.message);
      }
    );
  }
}
