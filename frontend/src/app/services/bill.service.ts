import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = environment.apiUrl

  constructor(
    private httpClient: HttpClient
  ) { }

  generateReport(data: any) {
    return this.httpClient.post(this.url + 
      "/bill/generateReport", data, {
      headers: new HttpHeaders().set('Content-Type', "appication/json")
    })
  } 

  getPDF(data: any):Observable<Blob> {
    return this.httpClient.post(this.url + '/bill/getPdf', data, {responseType: 'blob'});
  }
}
