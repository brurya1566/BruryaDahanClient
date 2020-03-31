import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responsible } from '../classes/responsible';

@Injectable({
  providedIn: 'root'
})
export class ResponsibleService {
URL="api/User/"


  constructor(private http:HttpClient) { }


  addRes(r:Responsible):Observable<any>{
    return this.http.post<any>(this.URL+"PostInsertaddUserToDB/",r)
  }
}
