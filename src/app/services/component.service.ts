import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { accountMovements } from '../classes/accountMovements';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
componentNameToGetTechnician:string
  constructor(private http: HttpClient) { }
  URL: string = "https://localhost:44398/api/accountmovements/"


  getAccountMovements(skip):Observable<Array<accountMovements>>
  {
  return this.http.get<Array<accountMovements>>(this.URL+"GetAccountMovement/?skip="+skip)
  }
  GetAccountMovementByPkReferenceCode(PkReferenceCode):Observable<any>{
    return this.http.get<any>(this.URL+"GetAccountMovementByPkReferenceCode/?PkReferenceCode="+PkReferenceCode)
  }
  GetBranchList():Observable<any>{
    return this.http.get<any>(this.URL+"GetBranchList")
  }  
  GetCityList():Observable<any>{
    return this.http.get<any>(this.URL+"GetCityList")
  }
  uploadFile(file):Observable<any>{
    return this.http.post<any>(this.URL+"uploadFile",{file:file})
  }

  
}
