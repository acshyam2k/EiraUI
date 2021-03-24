import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City, Country, CustomerType, State } from '../plant-type/plant-type.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

constructor(private http: HttpClient) { }

getCountries(): Observable<Country[]> {
  return this.http.get<Country[]>(`${environment.apiUrl}/location/getCountries`);
}

getStatesByCountryId(countryId:any): Observable<any[]> {
  if (countryId == -1) {
    return null;
  }
  return this.http.get<State[]>(`${environment.apiUrl}/location/getStates/${countryId}`);
}


getCitiesByStateId(stateId:any): Observable<any[]> {
  return this.http.get<City[]>(`${environment.apiUrl}/location/getCities/${stateId}`);
}


getCustomerTypes(): Observable<any[]>  {
  return this.http.get<CustomerType[]>(`${environment.apiUrl}/customerType/getAll`);

}



}
