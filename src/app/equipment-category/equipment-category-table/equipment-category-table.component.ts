import { Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild, } from '@angular/core';
import { CustomerDataService } from "src/app/service/data/customer/customer-data.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";


export interface EquipmentCategoryTableItem {
  siteTypeId: number;
  equipmentCategoryId: number;
  equipmentCategory: string;
  categoryGroup: string;
  shortname: string;
  remarks: string;
  categoryDescription:string;
  active:boolean;
  equipmentCategoryCode: number;

}

@Component({
  selector: 'app-equipment-category-table',
  templateUrl: './equipment-category-table.component.html',
  styleUrls: ['./equipment-category-table.component.css']
})
export class EquipmentCategoryTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() edit = new EventEmitter<boolean>();
  public dataSource = new MatTableDataSource<EquipmentCategoryTableItem>();

  displayedColumns = [
    "equipmentCategoryCode",
    "equipmentCategory",
    "categoryGroup",
    "shortname",
    "active",
    "action",

  ];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   }




  constructor(    private customerDataService: CustomerDataService
    ) { }


    public doFilter = (value: string) => {
      console.log(value);
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    };
    editEquipmentCategory(row) {
      console.log(JSON.stringify(row));
      this.edit.emit(row);
    }

  ngOnInit(){
      this.getAllEquipmentCategories();
    }


getAllEquipmentCategories(){
  this.customerDataService.getAllEquipmentCategories().subscribe((data: EquipmentCategoryTableItem[]) => {
  console.log("equipmentCategoryData"+ JSON.stringify(data));
    this.dataSource.data = data as EquipmentCategoryTableItem[];

});
}


public  refresh() {
  this.getAllEquipmentCategories();
}

}
