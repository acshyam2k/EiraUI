import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';
import { ParentElementComponent } from '../../parent-element.component';


export class RegionData {
  regionId: number;
  regionName: string;
  description: string;
}



@Component({
  selector: 'app-region-dialog',
  templateUrl: './region-dialog.component.html',
  styleUrls: ['./region-dialog.component.css']
})
export class RegionDialogComponent implements OnInit {
  regionName: string;
  description: string;

  constructor( public dialogRef: MatDialogRef<ParentElementComponent>,
    @Inject(MAT_DIALOG_DATA) public region: RegionData, public dataService: CustomerDataService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }



  showSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }



  onSaveClick(): void {
    var regionJsonData = this.region;

    delete regionJsonData.regionId;
    this.dataService.createRegion(regionJsonData)
    .subscribe (
      data => {
        this.showSnackBar('New Region created Successfully!');

        console.log(data);
           },
      err => {
        console.log(err);

      }
    )

    this.dialogRef.close();
  }

}
