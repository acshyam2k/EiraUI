import { Injectable } from '@angular/core';

export interface UserData {
  username: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})

export class UserDataObjectService {
  public userData: UserData;


constructor() { }

public getUserData() {
  return this.userData;
}

public setUserData(userData: any): void {
  this.userData = userData;
}

}


