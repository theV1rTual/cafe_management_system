import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  add(data: any) {
    return this.httpClient.post(this.url +
      '/category/add/', data, {
        headers: new HttpHeaders().set('Content-Type', "application/json")
      })
  } 

  update(data: any) {
    return this.httpClient.patch(this.url +
      '/category/update', data, {
        headers: new HttpHeaders().set('Content-Type', "application/json")
      })
  } 

  getCategories() {
    return this.httpClient.get(this.url + "/category/get/")
  }

}
