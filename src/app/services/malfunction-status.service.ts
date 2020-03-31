import { Injectable } from '@angular/core';
import { MalfunctionStatus } from '../classes/malfunction-status';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MalfunctionStatusService {
  
malfunctionStatusList: Array<MalfunctionStatus> = [new MalfunctionStatus(1,"new"),new MalfunctionStatus(2,"open"),new MalfunctionStatus(3,"close"),new MalfunctionStatus(2,"hold")]
  constructor(private http:HttpClient) { }
  URL="/api/Malfunction/"
  getMalfunctionStatus():Observable<Array<MalfunctionStatus>>
  {
    return this.http.get<Array<MalfunctionStatus>>(this.URL+"getMalfunctionStatus")
  }
}
