import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Item} from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http : HttpClient) { }

  getItemList() {
    return this.http.get(environment.apiUrl+'/api/Item/GetItems').toPromise();
  }
}
