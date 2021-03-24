import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadService } from '../service/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {


  @Input() parentForm: FormGroup;
  fileUploadId: any;

  @Output() afterSelectionMethod: EventEmitter<any[]> = new EventEmitter();


  constructor(private _snackBar: MatSnackBar, private _service: FileUploadService) { }

  ngOnInit() {
    this.fileUploadId = Object.keys(this.parentForm.controls)[0];
    this.parentForm.addControl(this.fileUploadId, new FormControl(''));
  }

  onFilesChange(f,from){
    debugger;
    this._snackBar.open(f.length + " File(s) selected!", null, {
        duration: 2000,
      });

    this._service.afterMethodFileSelect.next(f);
   }

  check(){
    return this.parentForm.get("uploadFormId").value;
  }

}
