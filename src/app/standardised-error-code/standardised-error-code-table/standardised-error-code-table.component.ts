import { Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild, } from '@angular/core';
import { CustomerDataService } from "src/app/service/data/customer/customer-data.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";



export interface StandardisedErrorCodeTableItem {
  errorCodeId : number,
  errorCode : string,
  errorMessage : string,
  componentType : string,
  errorDescription : string,
  equipmentTypeId : number,
  equipmentCategoryId : number,
  messageType : string,
  severity : number,
  active : boolean,
  priority : number,
  eiraErrorMessage : string,
  approvedBy : string,
  code : string

}

@Component({
  selector: 'app-standardised-error-code-table',
  templateUrl: './standardised-error-code-table.component.html',
  styleUrls: ['./standardised-error-code-table.component.css']
})


  export class StandardisedErrorCodeTableComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() edit = new EventEmitter<boolean>();
    public dataSource = new MatTableDataSource<StandardisedErrorCodeTableItem>();
  
    displayedColumns = [
      "equipmentType",
      "equipmentCategory",
      "errorMessage",
      "eiraErrorMessage",  
      "messageType",
      "priority",
      "active",
  "action"
    ];
  siteId: any;
    constructor(    private customerDataService: CustomerDataService
      ) { }
      categoryId:any;
      typeId:any;

    ngOnInit(): void {
    }



      
      public doFilter = (value: string) => {
        console.log(value);
        this.dataSource.filter = value.trim().toLocaleLowerCase();
      };
      editStandarisedErrorCode(row) {
        console.log(JSON.stringify(row));
        this.edit.emit(row);
      }
  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   }

   /*getAllStandardisedErrorCode(){
   this.customerDataService.getAllStandardisedErrorCode().subscribe((data: StandardisedErrorCodeTableItem[]) => {
    // console.log("equipmentCategoryData"+ JSON.stringify(data));
      this.dataSource.data = data as StandardisedErrorCodeTableItem[];
     
  });
  }*/

  isLoading = false;

  getStandardisedErrorCodeByCategoryId(){
    this.isLoading = true;
    this.dataSource.data = [];
    this.customerDataService.getAllStandardisedErrorCodeByCategoryId(this.categoryId).subscribe((data: StandardisedErrorCodeTableItem[]) => {
     // console.log("equipmentCategoryData"+ JSON.stringify(data));
       this.dataSource.data = data as StandardisedErrorCodeTableItem[];
      this.isLoading= false;

   });
   }


   
  getStandardisedErrorCodeByTypeId(){
    this.isLoading = true;
    this.dataSource.data = [];
    this.customerDataService.getAllStandardisedErrorCodeByEquipmentTypeId(this.typeId).subscribe((data: StandardisedErrorCodeTableItem[]) => {

      console.log("Response from Server::" + data);
      if (data === null) {
        this.dataSource.data = [];

      } else {
        this.dataSource.data = data as StandardisedErrorCodeTableItem[];
        console.log(this.dataSource.data);
 
      }
     //console.log("equipmentCategoryData"+ JSON.stringify(data));
       this.isLoading = false;
   });
   }

  

}
