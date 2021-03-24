import { Component, OnInit, ViewChild } from "@angular/core";
import { Validators, FormBuilder, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomerDataService } from "../service/data/customer/customer-data.service";
import { EquipmentCategoryTableComponent } from "./equipment-category-table/equipment-category-table.component";

@Component({
  selector: "app-equipment-category",
  templateUrl: "./equipment-category.component.html",
  styleUrls: ["./equipment-category.component.css"],
})
export class EquipmentCategoryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private customerDataService: CustomerDataService
  ) {}

  equipmentCategoryForm = this.fb.group({
    equipmentCategoryId: -1,
    siteTypeId: [null, Validators.required],
    categoryGroup: "",
    equipmentCategory: [null, Validators.required],
    categoryDescription: "",
    shortname: "",
    remarks: "",
    equipmentCategoryCode: -1,
    approvedBy: "",
    active: false,
  });
  @ViewChild(EquipmentCategoryTableComponent)
  private equipmentCategoryTableComponent: EquipmentCategoryTableComponent;

  siteTypes = [
    { siteType: "Solar", siteTypeId: 1 },
    { siteType: "wind", siteTypeId: 2 },
    { siteType: "hydro", siteTypeId: 3 },
  ];

  equipmentCategoryGroups: any;
  ngOnInit(): void {
    this.getAllEquipmentCategoryGroups();
  }

  showSnackBar(msg: any) {
    this.snackBar.open(msg, "Close", {
      duration: 2000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
  onSubmit() {
    this.saveEquipmentCategory();
  }
  saveEquipmentCategory() {
    var equipmentCategoryJsonData = this.equipmentCategoryForm.value;

    console.log(JSON.stringify(equipmentCategoryJsonData));
    if (this.equipmentCategoryForm.get("equipmentCategoryId").value === -1) {
      this.customerDataService
        .createEquipmentCategory(equipmentCategoryJsonData)
        .subscribe(
          (data) => {
            console.log(data);
            this.showSnackBar("New Equipment created Successfully!");
            //this.equipmentTableComponent.refresh();

            this.equipmentCategoryForm.reset();
            this.resetForm();
          },
          (err) => {
            console.log(err);
            this.showSnackBar(err.error.message);
          }
        );
    } else {
      this.customerDataService
        .updateEquipmentCategory(equipmentCategoryJsonData)
        .subscribe(
          (data) => {
            console.log(data);
            this.showSnackBar("Equipment Details Updated Successfully!");
            this.equipmentCategoryTableComponent.refresh();
            this.equipmentCategoryForm.reset();
            this.resetForm();
          },
          (err) => {
            console.log(err);
            this.showSnackBar(err.error.message);
          }
        );
    }
  }

  equipmentCategoryData: any;
  onEdit(row) {
    var equipmentCategoryId = row.equipmentCategoryId;
    this.customerDataService
      .getEquipmentCategoryById(row.equipmentCategoryId)
      .subscribe((data) => {
        console.log(data);
        this.equipmentCategoryData = data;

        this.equipmentCategoryForm.setValue(this.equipmentCategoryData);
      });
  }

  resetForm() {
    this.equipmentCategoryForm.get("siteTypeId").clearValidators();
    this.equipmentCategoryForm.get("siteTypeId").updateValueAndValidity();

    this.equipmentCategoryForm.reset();
  }

  getAllEquipmentCategoryGroups() {
    this.customerDataService
      .getAllEquipmentCategoryGroups()
      .subscribe((data) => {
        this.equipmentCategoryGroups = data;
      });
  }
}
