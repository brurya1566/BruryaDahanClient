import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Components } from '../classes/component';
import { componentNode } from '../components/esri-map/esri-map.component';
import { DoubleTree } from '../classes/DoubleTree';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
componentsList:Array<Components>=[]
currentComponent:Components=new Components(0,null,0,0,null)
lastComponent:Components
componentClicked:Components=null 
  constructor(private http: HttpClient) { }
  URL: string = "/api/Component/"
  getComponents(first:string, contains:string):Observable<any> {
    return this.http.get(this.URL+"getComponentByNamingConvention/"+first+"/"+contains)
  }

  getComponentsForTree(componentName):Observable<DoubleTree>{
    return this.http.get<DoubleTree>(this.URL+"getComponentsForTree/"+componentName)
  }
  
  getAllComponents():Observable<Array<Components>>
  {
    return this.http.get<Array<Components>>(this.URL+"GetAllComponents")
  }
  
}
