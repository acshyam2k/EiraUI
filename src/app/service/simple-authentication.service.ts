import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.apiUrl + '/user/login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SimpleAuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(username:string, password:string):  Observable<any>{

    return this.http.post(AUTH_API, {
      username,
      password
    }, httpOptions);

    //if (username === 'eira' && password==='admin123') {
    //  sessionStorage.setItem('loggedInUser', username);
    //  return true;
    //}
   // return false;
  }

  isUserLoggedIn() {
    let username = sessionStorage.getItem('loggedInUser')
    return !(username == null)
  }

  logout() {
    sessionStorage.removeItem('loggedInUser');
  }
}
