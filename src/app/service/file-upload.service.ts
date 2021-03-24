import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  public afterMethodFileSelect: Subject<any> = new Subject();

  constructor() { }
}
