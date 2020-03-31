import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urgency } from '../classes/urgency';

@Injectable({
  providedIn: 'root'
})
export class UrgencyService {

  constructor(private http: HttpClient) { }
  URL: string = "/api/Urgency/"
  
  
  urgencyLevelList: Array<Urgency> = [new Urgency(1,"דחוף"),new Urgency(2,"לא דחוף")]

  getUrgencyLevelFromDB(): Observable<Array<Urgency>> {
    return this.http.get<Array<Urgency>>(this.URL + "getUrgencyLevel")
  }
  getUrgencyLevel() {
    if (this.urgencyLevelList == null) {
      this.getUrgencyLevelFromDB().subscribe(
        d => { this.urgencyLevelList = d },
        e => {
          console.log(e)
          console.log(e)
        })
    }
    return this.urgencyLevelList
  }

}
