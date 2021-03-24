import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {
  public loginState$: Subject<boolean> = new Subject();
  constructor() { }
}
