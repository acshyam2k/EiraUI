import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsBySiteConfigService {
  public siteId$: Subject<number> = new Subject();

  constructor() { }
}
