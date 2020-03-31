/*
  Copyright 2019 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  AfterViewInit
} from "@angular/core";
import { loadModules } from "esri-loader";
import esri = __esri; // Esri TypeScript Types
import { MatDialog } from '@angular/material/dialog';
import { MalfunctionReportComponent } from '../malfunction-report/malfunction-report.component';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/typings/scroll/scroll-strategy';
import { on } from 'cluster';
import { LayerService } from '../../services/layer.service';
import { ComponentService } from '../../services/component.service';
import { Components } from '../../classes/component';
import { element, promise } from 'protractor';
import { viewClassName, Type } from '@angular/compiler';
import { LogMalfunctionService } from '../../services/log-malfunction.service';
import { MalfunctionService } from '../../services/malfunction.service';
import { LogMalfunction } from '../../classes/logMalfunction';
import { LogMalfunctionComponent } from '../log-malfunction/log-malfunction.component';
import { TabReportsComponent } from '../tab-reports/tab-reports.component';
import { HirarchiaService } from 'src/app/services/hirarchia.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatSnackBar } from '@angular/material';
import { LocalTypeService } from 'src/app/services/local-type.service';
import { FactoryService } from 'src/app/services/factory.service';
import { myType } from 'src/app/interface/mytype';
import * as Task from 'esri/tasks/Task';
export class componentNode {
  name: string;
  showName: string;
  children?: componentNode[];
}
var myTreeComponent: componentNode[] = []
var myNode: componentNode

@Component({
  selector: "app-esri-map",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.scss"]
})
export class EsriMapComponent implements OnInit {//,AfterViewInit{

  hirarchiaList: string[] = ['cty', 'stn', 'flr', 'com', 'dir', 'num']
  treeControl = new NestedTreeControl<componentNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<componentNode>();
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;


  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  _first: string
  contain: string
  //private _loaded = false;

  currentType: myType
  constructor(
    private dialog: MatDialog,
    private layerSer: LayerService,
    private componentSer: ComponentService,
    private MalfunctionSer: MalfunctionService,
    private logMalfunctionSer: LogMalfunctionService,
    private hirarchiaSer: HirarchiaService,
    private _snackBar: MatSnackBar,
    private localTypeSer: LocalTypeService,
    private factortSer: FactoryService) {
    this.dataSource.data = myTreeComponent;
  }

  async ngOnInit() {
    // var result = Task.Run(async() => { return await this.initilaize(); }).Result;
    this.initilaize()
  }
  async initilaize() {
    this.factortSer.getType().subscribe(
      async d => {
        if (d != null || d != undefined) {
          this.currentType = this.factortSer.getInstance(d[0])
          await this.currentType.initializeMap(this.mapViewEl)
        }
        else { console.log("no string returned from the server") }
        if (this.componentSer.componentClicked == null) {
          this.getChildsOfTree(null)
        }
        else {
          this.componetClickedTrue()
          this.buildTreeViewByComponentName()
        }
      },
      e => { console.log("error from get type " + e) }
    );
  }
  hasChild = (_: number, node: componentNode) => !!node.children && node.children.length > 0;
  async getChildsOfTree(node?: componentNode) {
    const [EsriMap, EsriMapView, EsriFeatureLayer, EsriPoint, Graphic, On, Fielddd] = await loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/geometry/Point",
      "esri/Graphic",
      "dojo/on",
      "dojo/domReady!",
      "esri/layers/support/Field"
    ]);
    if (node == null || node != null && node.children.length == 0) {
      var first: string
      var contain: string
      if (node == null) {
        first = this.hirarchiaList[0]
        contain = this.hirarchiaList[0]
      }
      else {
        var c = this.componentSer.componentsList.find(e => e.name == node.name)
        this.componentSer.lastComponent = c
        var x = node.name.substring(0, node.name.indexOf('_'))
        var num = this.hirarchiaList.indexOf(x)
        first = this.hirarchiaList[num + 1]
        contain = node.name
      }
      this.localTypeSer.removed()

      try {
        this.localTypeSer.added(first)
      }
      catch (e) {
        console.log(e)
      }
      this.componentSer.getComponents(first, contain).subscribe(
        d => {
          console.log(d + "opp")
          if (d == []) {
            console.log("hii")
          }
          else {
            this.componentSer.componentsList = d;
            try {
              this.componentSer.componentsList.forEach(e => {
                var myNode: componentNode = { name: e.name, showName: e.showName, children: [] }
                if (node == null) {
                  myTreeComponent.push(myNode)
                }
                else {
                  node.children.push(myNode);
                }
              })
            }
            catch (e) { console.log(e) }
            this.dataSource.data = null
            this.dataSource.data = myTreeComponent

            this.componentSer.componentsList.forEach(element => {
              var feature = new Graphic({
                geometry: new EsriPoint({
                  x: element.longitude,
                  y: element.latitude
                }),
                attributes: {
                  xObjectID: element.id,
                  name: element.name,
                }
              })
              if (this.layerSer.layersList.find(e => e.nameConvention == first) == undefined ||
                this.layerSer.layersList.find(e => e.nameConvention == first) == null) { console.log('hii corentlayer is undefined') }
              else {
                this.layerSer.layersList.find(e => e.nameConvention == first).concretLayer.applyEdits({ addFeatures: [feature] });
              }
            });
            if (this.componentSer.lastComponent != null) {
              this.localTypeSer._view.center = new EsriPoint({ x: this.componentSer.lastComponent.longitude, y: this.componentSer.lastComponent.latitude })
              this.localTypeSer._view.zoom = this.layerSer.layersList.find(e => e.nameConvention == first).zoom
            }

          }
        }, e => {
          console.log(e)
        })
    }
    else {
      //////////////////need copy to them
      var first = node.name.substring(0, node.name.indexOf('_'))
      if (first == "cty") {
        this.componentSer.lastComponent = new Components(null, null, 31.770745, 35.182141, null)
      }
      else {
        var l = this.hirarchiaList.indexOf(first)
        var f = this.hirarchiaList[l - 1]
        var contain2 = node.name.substring(node.name.indexOf(f))

        this.componentSer.getComponents(f, contain2).subscribe(d => {
          this.componentSer.lastComponent = d[0]
          
        }, e => {
          alert("error" + e)
        })
      }
      //////////////////////until here
      // Rachelly add

      console.log("כבר טען שלא יטען שוב")
      node.children = []
      this.dataSource.data = null
      this.dataSource.data = myTreeComponent
      //////////////////////////////////
      var something = node.name.substring(0, node.name.indexOf('_'))
      this.localTypeSer._map.layers.removeAll()
      this.localTypeSer._map.add(this.layerSer.layersList.find(e => e.nameConvention == something).concretLayer)
      this.componentSer.getComponents(something, '_').subscribe(
        d => {
          if (d != []) {
            this.componentSer.componentsList = d
            this.componentSer.componentsList.forEach(element => {
              var feature = new Graphic({
                geometry: new EsriPoint({
                  x: element.longitude,
                  y: element.latitude
                }),
                attributes: {
                  xObjectID: element.id,
                  name: element.name,
                }
              })
              this.layerSer.layersList.find(e => e.nameConvention == something).concretLayer.applyEdits({ addFeatures: [feature] });

            })
            this.localTypeSer._view.center = new EsriPoint({ x: this.componentSer.lastComponent.longitude, y: this.componentSer.lastComponent.latitude })
            this.localTypeSer._view.zoom=this.layerSer.layersList.find(e => e.nameConvention == something).zoom
          }
        },
        e => {

        }
      )

      console.log("כבר טען שלא יטען שוב")
    }
  }





  async componetClickedTrue() {
    const [EsriMap, EsriMapView, EsriFeatureLayer, EsriPoint, Graphic, On, Fielddd] = await loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/geometry/Point",
      "esri/Graphic",
      "dojo/on",
      "dojo/domReady!",
      "esri/layers/support/Field"
    ]);

    if (this.componentSer.componentClicked != null) {
      var x = this.componentSer.componentClicked.name.substring(0, this.componentSer.componentClicked.name.indexOf('_'))
      var first = this.componentSer.componentClicked.name.substring(0, this.componentSer.componentClicked.name.indexOf('_'))
      if (first == "cty") {
        this.componentSer.lastComponent = new Components(null, null, 31.770745, 35.182141, null)
        // this.makeZoomAndCenter(x)
        this.localTypeSer._view.center = new EsriPoint({ x: this.componentSer.lastComponent.longitude, y: this.componentSer.lastComponent.latitude })
          this.localTypeSer._view.zoom = this.layerSer.layersList.find(e => e.nameConvention == first).zoom
        // this.componentSer.lastComponent.longitude = 35.182141
        // this.componentSer.lastComponent.latitude = 31.770745
      }
      else {
        var l = this.hirarchiaList.indexOf(first)
        var f = this.hirarchiaList[l - 1]
        var contain2 = this.componentSer.componentClicked.name.substring(this.componentSer.componentClicked.name.indexOf(f))
        this.componentSer.getComponents(f, contain2).subscribe(d => {
          this.componentSer.lastComponent = d[0]
          this.localTypeSer._view.center = new EsriPoint({ x: this.componentSer.lastComponent.longitude, y: this.componentSer.lastComponent.latitude })
          this.localTypeSer._view.zoom = this.layerSer.layersList.find(e => e.nameConvention == first).zoom
        //this.makeZoomAndCenter(x)
        }, e => {
          alert("error" + e)
        })
      }
      if (x == "com") {
        var name = this.componentSer.componentClicked.name.substring(this.componentSer.componentClicked.name.indexOf('_'))
        x = name.substring(0, name.indexOf('_'))
      }
      // var num = this.hirarchiaList.indexOf(x)
      this.localTypeSer._map.layers.removeAll()
      try {
        this.localTypeSer._map.add(this.layerSer.layersList.find(e => e.nameConvention == x).concretLayer)
      }
      catch (e) {
        console.log(e)
      }
      var feature = new Graphic({
        geometry: new EsriPoint({
          x: this.componentSer.componentClicked.longitude,
          y: this.componentSer.componentClicked.latitude
        }),
        attributes: {
          xObjectID: this.componentSer.componentClicked.id,
          name: this.componentSer.componentClicked.name,
        }
      })
      try {
        this.layerSer.layersList.find(e => e.nameConvention == x).concretLayer.applyEdits({ addFeatures: [feature] });
      }
      catch (e) {
        alert("error " + e)
      }
    }
    else {
      alert("else " + this.componentSer.componentClicked.showName)
    }
  }

  buildTreeViewByComponentName() {

    this.componentSer.getComponentsForTree(this.componentSer.componentClicked.name).subscribe(
      d => {
        if (d != null) {
          this.componentSer.componentsList = d.components
          myTreeComponent = d.nodes
          this.dataSource.data = myTreeComponent
        
        }
      },
      e => {
      
        console.log(e)
      }
    )
  }


  async makeZoomAndCenter(x) {
    const [EsriMap, EsriMapView, EsriFeatureLayer, EsriPoint, Graphic, On, Fielddd] = await loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/geometry/Point",
      "esri/Graphic",
      "dojo/on",
      "dojo/domReady!",
      "esri/layers/support/Field"
    ]);

    this.localTypeSer._view.zoom = this.layerSer.layersList.find(e => e.nameConvention == x).zoom///ruth need to change it
    this.localTypeSer._view.center = new EsriPoint({ x: this.componentSer.lastComponent.longitude }, { y: this.componentSer.lastComponent.latitude })
  }
}
