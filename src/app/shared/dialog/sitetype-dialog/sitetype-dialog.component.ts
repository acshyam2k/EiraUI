import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';
import { ParentElementComponent } from '../../parent-element.component';

export class SiteData {
  siteType: string;
  shortName: string;
  description: string;
}

@Component({
  selector: 'app-sitetype-dialog',
  templateUrl: './sitetype-dialog.component.html',
  styleUrls: ['./sitetype-dialog.component.css']
})
export class SitetypeDialogComponent implements OnInit {
  sitetype: string;
  description: string; 

  constructor( public dialogRef: MatDialogRef<ParentElementComponent>,
    @Inject(MAT_DIALOG_DATA) public siteData: SiteData, public dataService: CustomerDataService) { }



  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }


  onSaveClick(): void {
    var siteJsonData = this.siteData;

    console.log("SiteType data>>" + siteJsonData);
    
    this.dataService.createSiteType(siteJsonData)
    .subscribe (
      data => {
        console.log(data);
           },
      err => {
        console.log(err);

      }
    )

    this.dialogRef.close();
  }

}
