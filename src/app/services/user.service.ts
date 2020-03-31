

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/Classes/user';
import { Responsible } from '../classes/responsible';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  URL:string="api/User/"

  currentUser:User
  name:string
  responsiblePassword:string
  id:string
  setName(n){this.name=n}
  setPassword(p){this.responsiblePassword=p}
  //setUserId(i){this.id=i[0]}
  //setLocalUser(i:number,n:string,p:string){this.setUserId(i);this.setName(n);this.setPassword(p);}
  setcurrentUser(u){this.currentUser=u}
  checkUser(user:User):Observable<User>
  {
    return this.http.post<User>(this.URL+"checkUser",user);
  }
  getResponsible():Observable<Array<Responsible>>
  {
    return this.http.get<Array<Responsible>>(this.URL+"getResponsibles");
  }


 
  // addUserToDB(user:User):Observable<User>
  // {
  //   return this.http.post<User>(this.URL+"PostInsertaddUserToDB/",user);
  // }
}
