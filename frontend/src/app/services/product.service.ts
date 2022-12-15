import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.apiUrl

  constructor(
    private httpClient: HttpClient
  ) { }

  add(data: any) {
    return this.httpClient.post(this.url + 
      "/product/add", data, {
        headers: new HttpHeaders().set('Content-Type', "application/json")
      }  
    )
  }
}
