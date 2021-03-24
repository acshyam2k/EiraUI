import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';

export interface SiteTableItem {
  siteId: number;
  siteCode: string;
  siteName: string;
  customerName: string;
  siteType: string;
  country: string;
  state: string;
  city: string;
  active: boolean;
}
@Component({
  selector: 'app-site-table',
  templateUrl: './site-table.component.html',
  styleUrls: ['./site-table.component.css']
})
export class SiteTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() edit = new EventEmitter<boolean>();
  public dataSource = new MatTableDataSource<SiteTableItem>();


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['siteCode', 'siteName', 'customerName', 'siteType', 'country', 'state', 'city', 'active', 'action'];

  ngOnInit() {
    this.getAllSites();

  }

  getAllSites() {
    this.customerDataService.getSiteDetails().subscribe((data: SiteTableItem[]) => {
      this.dataSource.data = data as SiteTableItem[];

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
    console.log("Inside refresh of Site Table>>");
    this.customerDataService.getSiteDetails().subscribe((data: SiteTableItem[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  editSite(row) {
    console.log(JSON.stringify(row));
    this.edit.emit(row);

  }
}
