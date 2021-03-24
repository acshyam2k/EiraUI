import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';

export interface CompanyTableItem {
  companyId: number;
  companyCode: string;
  companyName: string;
  companyType: string;
  country: string;
  state: string;
  city: string;
  companyLogo: any;
  active: boolean;
}



@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.css']
})
export class CompanyTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() edit = new EventEmitter<boolean>();
  public dataSource = new MatTableDataSource<CompanyTableItem>();


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['companyCode', 'companyName',  'country', 'state', 'city', 'active','companyLogo', 'action'];

  ngOnInit() {
    this.getAllCompanyDetails();

  }

  getAllCompanyDetails() {
    this.customerDataService.getCompanyDetails().subscribe((data: CompanyTableItem[]) => {
      this.dataSource.data = data as CompanyTableItem[];

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
    console.log("Inside refresh of Company Table>>");
    this.customerDataService.getCompanyDetails().subscribe((data: CompanyTableItem[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  editCompany(row) {
    console.log(JSON.stringify(row));
    this.edit.emit(row);

  }

}
