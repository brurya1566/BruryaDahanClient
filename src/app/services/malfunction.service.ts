import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Malfunction } from '../classes/malfunction';
import { MalfunctionStatus } from '../classes/malfunction-status';
import { Urgency } from '../classes/urgency';
import { addMalfunction } from '../classes/addMalfunction';
import { malfunctionByComponentId } from '../classes/malfunctionByComponentId';

@Injectable({
  providedIn: 'root'
})
export class MalfunctionService {
  constructor(private http:HttpClient) { }
  addNewMalfunction:addMalfunction=new addMalfunction()
  malfunctionBySpesificComponent:Malfunction
  setIdMalfunction(_id:number){
    this.addNewMalfunction.id=_id
  }
  setComponentAddMalfunction(_component:number){
    this.addNewMalfunction.componentId=_component
  }
  setMalfunctionDescription(_malfunctionDescription:string){
    this.addNewMalfunction.malfunctionDescription=_malfunctionDescription
  }
  setUrgencyIdAddMalfunction(_urgency:number){
    this.addNewMalfunction.urgencyId=_urgency
  }
  URL:string="/api/Malfunction/"
  addMalfunction(malfunction:addMalfunction):Observable<any>{
    return this.http.post<any>(this.URL+"addMalfunctionToDB/",malfunction)
  }
  getMalfunctionByComponentId(componentId:number):Observable<Array<malfunctionByComponentId>>{
    return this.http.get<Array<malfunctionByComponentId>>(this.URL+"getMalfunctionByComponentId/"+componentId)
  }
  getMalfunction():Observable<Array<malfunctionByComponentId>>
  {
    return this.http.get<Array<malfunctionByComponentId>>(this.URL+"getMalfunctions")
  }

  
}
