import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Roles } from '../classes/roles';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }
URL="api/Role/"
rolesList:Roles[]=null
  getRoles():Observable<Array<Roles>>{
    return this.http.get<Array<Roles>>(this.URL+"getRoles")
  }
}
