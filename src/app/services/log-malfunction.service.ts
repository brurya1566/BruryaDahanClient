import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogMalfunction } from '../classes/logMalfunction';
import { HttpClient } from '@angular/common/http';
import { viewLog } from '../classes/viewLog';
import { addLogMalfunction } from '../classes/addLogMalfunction';
import { malfunctionByComponentId } from '../classes/malfunctionByComponentId';
import { LogMalfunctionStatus } from '../classes/LogMalfunctionStatus';

@Injectable({
  providedIn: 'root'
})
export class LogMalfunctionService {
  URL = "/api/LogMalfunction/"
  constructor(private http: HttpClient) { }
  malfunctionComponent:Array<malfunctionByComponentId>=[]
setMalfunctionByComponentid(_m:Array<malfunctionByComponentId>){
  this.malfunctionComponent=_m
}
logMalfunction:addLogMalfunction=new addLogMalfunction();
setMalfunctionId(_MalfunctionId:number){
  this.logMalfunction.malfunctionId=_MalfunctionId
}
setresponsibleId(_responsibleId:string)
{
  this.logMalfunction.responsibleId=_responsibleId
}
setLogMalfunctionStatusId(_logMalfunctionStatusId:number)
{
this.logMalfunction.logMalfunctionStatusId=_logMalfunctionStatusId
}
setStatusDescription(_statusDescription:string)
{
  this.logMalfunction.statusDescription=_statusDescription
}
  addLogMalfunction(addLogMalfunction:addLogMalfunction):Observable<any>{
    return this.http.post<any>(this.URL+"addLogMalfunctionToDB",addLogMalfunction)
  }

  getLogMalfunction(): Observable<Array<viewLog>> {
    return this.http.get<Array<viewLog>>(this.URL+"getLogmalfunctions")
  }
  getLogMalfunctionStatus():Observable<Array<LogMalfunctionStatus>>
  {
    return this.http.get<Array<LogMalfunctionStatus>>(this.URL+"getLogMalfunctionStatus")
  }
}



  



