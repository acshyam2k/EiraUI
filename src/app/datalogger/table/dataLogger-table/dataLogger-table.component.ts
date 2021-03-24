import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';

export interface DataLoggerTableItem {
  dataLoggerId: number;
  description: string;
  remarks: string;
  active: boolean;
}

@Component({
  selector: 'app-dataLogger-table',
  templateUrl: './dataLogger-table.component.html',
  styleUrls: ['./dataLogger-table.component.scss']
})
export class DataLoggerTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() edit = new EventEmitter<boolean>();
  public dataSource = new MatTableDataSource<DataLoggerTableItem>();


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['description',  'remarks','active','action'];

  ngOnInit() {
    this.getAllDataLoggerDetails();

  }

  getAllDataLoggerDetails() {
    this.customerDataService.getDataLoggers().subscribe((data: DataLoggerTableItem[]) => {
      this.dataSource.data = data as DataLoggerTableItem[];

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
    console.log("Inside refresh of DataLogger Table>>");
    this.customerDataService.getDataLoggers().subscribe((data: DataLoggerTableItem[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  editDataLogger(row) {
    console.log(JSON.stringify(row));
    this.edit.emit(row);

  }


}
