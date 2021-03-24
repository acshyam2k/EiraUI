import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDataService } from '../service/data/customer/customer-data.service';
import { DataLoggerTableComponent } from './table/dataLogger-table/dataLogger-table.component';

@Component({
  selector: 'app-datalogger',
  templateUrl: './datalogger.component.html',
  styleUrls: ['./datalogger.component.scss']
})
export class DataloggerComponent implements OnInit {


  dataLoggerForm = this.fb.group({
    dataLoggerId: -1,
    description : [null, Validators.required],
    remarks: null,
    active: null

  });


  @ViewChild(DataLoggerTableComponent)
  private dataLoggerTableComponent: DataLoggerTableComponent;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.dataLoggerForm.valid) {
      this.saveDataLogger();
    }

  }


  showSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  saveDataLogger() {
    var dataLoggerJsonData = this.dataLoggerForm.value;

    console.log (JSON.stringify(dataLoggerJsonData));
    if(this.dataLoggerForm.get('dataLoggerId').value === -1) {
      this.customerDataService.createDataLogger(dataLoggerJsonData)
          .subscribe (
            data => {
              console.log(data);
              this.showSnackBar('DataLogger created Successfully!');
              this.dataLoggerTableComponent.refresh();

              this.dataLoggerForm.reset();
              this.resetForm();
              },
            err => {
              console.log(err);
              this.showSnackBar(err.error.message);

            }
          )
    } else {
      this.customerDataService.updateDataLogger(dataLoggerJsonData)
          .subscribe (
            data => {
              console.log(data);
              this.showSnackBar('DataLogger details Updated Successfully!');
              this.dataLoggerTableComponent.refresh();

              this.dataLoggerForm.reset();
              this.resetForm();
             },
             err => {
               console.log(err);
               this.showSnackBar(err.error.message);

             }
          )
    }
  }


  onEdit(row) {
     this.customerDataService.getDataLoggerById(row.dataLoggerId) .subscribe (
      data => {
        console.log(data);
        this.dataLoggerForm.setValue(data);
         }
    )
  }


  resetForm() {
    this.dataLoggerForm.get('dataLoggerId').updateValueAndValidity();
    this.dataLoggerForm.get('description').clearValidators();
    this.dataLoggerForm.get('description').updateValueAndValidity();
    this.dataLoggerForm.get('remarks').updateValueAndValidity();

    this.dataLoggerForm.reset();


  }


}
