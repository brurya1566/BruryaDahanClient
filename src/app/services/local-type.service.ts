import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { loadModules } from 'esri-loader';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatDialog, MatSnackBar } from '@angular/material';
import esri = __esri; // Esri TypeScript Types
import { LayerService } from './layer.service';
import { ComponentService } from './component.service';
import { MalfunctionService } from './malfunction.service';
import { LogMalfunctionService } from './log-malfunction.service';
import { HirarchiaService } from './hirarchia.service';
import { TabReportsComponent } from '../components/tab-reports/tab-reports.component';
import { myType } from '../interface/mytype';

@Injectable({
  providedIn: 'root'
})
export class LocalTypeService implements myType{

  hirarchiaList: string[] = ['cty', 'stn', 'flr', 'com', 'dir', 'num']
  // treeControl = new NestedTreeControl<componentNode>(node => node.children);
  // dataSource = new MatTreeNestedDataSource<componentNode>();


  _first: string
  contain: string
   _zoom = 8
   _center: Array<number> = [35.182141, 31.770745]
   _basemap = "streets"
   _view: esri.MapView = null
  _layer: esri.FeatureLayer = null
  _ctyLayer: esri.FeatureLayer = null
  _stnLayer: esri.FeatureLayer = null
  _flrLayer: esri.FeatureLayer = null
  _camLayer: esri.FeatureLayer = null
  _wndLayer: esri.FeatureLayer = null
  _field: esri.Field = null
  _map: esri.Map
  _feature: any


  constructor(
    private dialog: MatDialog,
    private layerSer: LayerService,
    private componentSer: ComponentService,
    private MalfunctionSer: MalfunctionService,
    private logMalfunctionSer: LogMalfunctionService,
    private _snackBar: MatSnackBar) {
  }

  getFeatures(response) {
    var c = this
    if (response.results.length) {
      const graphic = response.results.filter(function (result) {
        return result.graphic.layer;
      })[0].graphic;
      // console.log(graphic)
      if (graphic) {
        var attributes = graphic.attributes;
        var id = graphic.attributes.xObjectID;
        try {
          this.componentSer.currentComponent.id = id
        }
        catch (e) { alert(e) }
        this.MalfunctionSer.getMalfunctionByComponentId(id).subscribe(
          d => {
            if (d) {
              this.logMalfunctionSer.setMalfunctionByComponentid(d);
              //this.newLogMalfunction()
            }
            else {
              this.MalfunctionSer.setComponentAddMalfunction(id)
              //this.newMalfunction()
            }
            this.newMalfunction()
          },
          e => {

          }
        )
      }
    }
  }
  newMalfunction() {
    try {
      const dialogRef = this.dialog.open(TabReportsComponent, {
        // const dialogRef = this.dialog.open(MalfunctionReportComponent, {
        height: '500px',
        width: '500px'
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result == "added") {
          this._snackBar.open("Malfunction reporting saved successfully!", null, {
            duration: 3000
          })
        }
      })

    }
    catch (e) {
      console.log("error" + e)
    }

  }

  removed() {
    this._map.layers.removeAll()
  }

  added(first) {

    this._map.add(this.layerSer.layersList.find(e => e.nameConvention == first).concretLayer)

  }
  async initializeMap(mapViewEl) {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [EsriMap, EsriMapView, EsriFeatureLayer, EsriPoint, Graphic, On, Field] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/geometry/Point",
        "esri/Graphic",
        "dojo/on",
        "esri/layers/support/Field",
        "dojo/domReady!"
      ]);
      this._map = new EsriMap({
        basemap: this._basemap
      });
      this._view = new EsriMapView({
        container: mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: this._map
      });
      var fields = [
        new Field({
          name: "xObjectID",
          alias: "xObjectID",
          type: "integer"
        }), new Field({
          name: "name",
          alias: "name",
          type: "string"
        })
      ];
      this.layerSer.getLayers().subscribe(d => {
        console.log(d)
        this.layerSer.layersList = d;
        this.layerSer.layersList.forEach(element => {
          element.concretLayer = new EsriFeatureLayer({
            source: [],
            geometryType: 'point',
            objectIdField: 'objectId',
            renderer: {
              type: "simple",
              symbol: {
                type: "picture-marker",
                url: element.url,
                width: "25px", height: "25px"
              }
            },
            fields: fields
          })
        });

      }, e => {
        console.log(e)
      })
      this._view.on('click', evt => this._view.hitTest(evt).then(response => this.getFeatures(response)))
      await this._view.when();
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }


}
