import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CustomerDataService } from "src/app/service/data/customer/customer-data.service";
import { EquipmentsBySiteConfigService } from "src/app/service/equipments-by-site-config.service";

export interface EquipmentTableItem {
  siteId: number;
  equipmentId: number;
  equipmentCode: string;
  equipmentCategory: string;
  equipmentType: string;
  displayName: string;
  customerNaming: string;
  status: string;
  active: boolean;
}

@Component({
  selector: "app-equipment-table",
  templateUrl: "./equipment-table.component.html",
  styleUrls: ["./equipment-table.component.css"],
})
export class EquipmentTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() edit = new EventEmitter<boolean>();
  public dataSource = new MatTableDataSource<EquipmentTableItem>();

  public siteId: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    "equipmentCode",
    "equipmentCategory",
    "equipmentType",
    "displayName",
    "customerNaming",
    "status",
    "action",
  ];

  ngOnInit() {

  }

  getAllequipmentDetails() {
    this.customerDataService
      .getEquipmentDetailsBySite(this.siteId)
      .subscribe((data) => {
        console.log(data.status);
        if (data.status === 200) {
          this.dataSource.data = data.body as EquipmentTableItem[];
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource.data = [];

        }

      });
  }

  constructor(
    private customerDataService: CustomerDataService,
    private _equipmentsBySiteConfigService: EquipmentsBySiteConfigService
  ) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    console.log(value);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  refresh() {
    console.log("Inside refresh of Equipment Table>>");

    console.log("Site Id in equipment-table component:" + this.siteId);

    this.getAllequipmentDetails();
    this._equipmentsBySiteConfigService.siteId$.subscribe((res) => {

    });
   }

  editEquipment(row) {
    console.log(JSON.stringify(row));
    this.edit.emit(row);
  }
}
