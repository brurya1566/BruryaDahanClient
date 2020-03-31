import { Injectable } from '@angular/core';
import { myType } from '../interface/mytype';

@Injectable({
  providedIn: 'root'
})
export class EsriTypeService implements myType {

  constructor() { }
  hirarchiaList: string[];
  _first: string;
  contain: string;
  _zoom: number;
  _center: number[];
  _basemap: string;
  _view: __esri.MapView;
  _layer: __esri.FeatureLayer;
  _ctyLayer: __esri.FeatureLayer;
  _stnLayer: __esri.FeatureLayer;
  _flrLayer: __esri.FeatureLayer;
  _camLayer: __esri.FeatureLayer;
  _wndLayer: __esri.FeatureLayer;
  _field: __esri.Field;
  _map: __esri.Map;
  _feature: any;
  getFeatures(response: any) {
    throw new Error("Method not implemented.");
  }
  newMalfunction() {
    throw new Error("Method not implemented.");
  }
  removed() {
    throw new Error("Method not implemented.");
  }
  added(first: any) {
    throw new Error("Method not implemented.");
  }
  initializeMap(mapViewEl: any) {
    throw new Error("Method not implemented.");
  }
}
