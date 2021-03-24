import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';



export interface EquipmentTypeTableItem {
    equipmentTypeId;
    equipmentTypeCode;
    equipmentType;
    equipmentCategoryId;
    description;
    displayName;
    remarks;
    manufacturer;
    moduleType;
    active;
}

@Component({
  selector: 'app-equipmenttype-table',
  templateUrl: './equipmenttype-table.component.html',
  styleUrls: ['./equipmenttype-table.component.css']
})
export class EquipmenttypeTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() edit = new EventEmitter<boolean>();
  public dataSource = new MatTableDataSource<EquipmentTypeTableItem>();


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['equipmentTypeCode', 'equipmentType', 'equipmentCategory',
           'displayName',  'manufacturer', 'moduleType', 'active', 'action'];

  ngOnInit() {
    this.getAllEquipmentTypes();

  }

  getAllEquipmentTypes() {
    this.customerDataService.getAllEquipmentTypes().subscribe((data: EquipmentTypeTableItem[]) => {
      this.dataSource.data = data as EquipmentTypeTableItem[];

    });
  }


  constructor(
     private customerDataService: CustomerDataService
  ) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   }

  public doFilter = (value: string) => {
    console.log(value);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  refresh() {
    console.log("Inside refresh of EquipmentType Table>>");
    this.customerDataService.getAllEquipmentTypes().subscribe((data: EquipmentTypeTableItem[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  editEquipmentType(row) {
    console.log(JSON.stringify(row));
    this.edit.emit(row);

  }


}
