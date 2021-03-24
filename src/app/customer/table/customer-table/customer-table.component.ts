import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';

export interface CustomerTableItem {
  customerId: number;
  customerCode: string;
  customerName: string;
  companyName: string;
  customerType: string;
  country: string;
  state: string;
  city: string;
  active: boolean;
}
@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() edit = new EventEmitter<boolean>();
  public dataSource = new MatTableDataSource<CustomerTableItem>();


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['customerCode', 'customerName',  'companyName', 'country', 'state', 'city', 'active', 'action'];

  ngOnInit() {
    this.getAllCustomerDetails();

  }

  getAllCustomerDetails() {
    var companyId = 1;
    this.customerDataService.getAllCustomers(companyId).subscribe((data: CustomerTableItem[]) => {
      this.dataSource.data = data as CustomerTableItem[];

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
    console.log("Inside refresh of Customer Table>>");
    this.customerDataService.getAllCustomers(1).subscribe((data: CustomerTableItem[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  editCustomer(row) {
    console.log(JSON.stringify(row));
    this.edit.emit(row);

  }

}
