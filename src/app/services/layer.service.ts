import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Layer } from '../classes/layer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  constructor(private http:HttpClient) { }
  layersList:Array<Layer>=[]
  URL:string="/api/Layer/"
  //urgencyLevelList:Array<Layer> = [new Layer(1,"cmr","camera")]
  getLayers():Observable<any>{
    return this.http.get<any>(this.URL+"getLayers")
  }





}
