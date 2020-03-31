import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Components } from '../classes/component';

@Injectable({
  providedIn: 'root'
})
export class ServiceCenterService {

  constructor(private http:HttpClient) { }
  URL:string="/api/ServiceCenter/"  
  malfunctionList:Array<any>=[]

  getNewMalfunctions():Observable<Array<any>>
  {
    return this.http.get<Array<any>>(this.URL+"getNewMalfunctions")
  }
 
}
