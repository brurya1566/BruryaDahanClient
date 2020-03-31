import { Injectable } from '@angular/core';
import { LocalTypeService } from './local-type.service';
import { EsriTypeService } from './esri-type.service';
import { LayerService } from './layer.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ComponentService } from './component.service';
import { MalfunctionService } from './malfunction.service';
import { LogMalfunctionService } from './log-malfunction.service';
import { Dictionary } from '../classes/dictionary';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor(
    private http:HttpClient,
    private localTypeSer: LocalTypeService,
    private EsriTypeSer: EsriTypeService
  ) {
    this.dic.set("LocalTypeService", this.localTypeSer)
    this.dic.set("EsriTypeService", this.EsriTypeSer)

  }
  URL="/api/Factory/"
  dic = new Dictionary();
  getInstance(serviceName: string) {
    return this.dic.get(serviceName);
  }
  getType():Observable<string>
  {
    return this.http.get<string>(this.URL+"getIsOn")
  }

}
