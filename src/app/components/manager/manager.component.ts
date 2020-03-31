
import { Component, OnInit } from '@angular/core';
import { LogMalfunctionService } from 'src/app/services/log-malfunction.service';
import { LogMalfunction } from 'src/app/classes/logMalfunction';
import { viewLog } from 'src/app/classes/viewLog';
import { UserService } from 'src/app/services/user.service';
import { Responsible } from 'src/app/classes/responsible';
import { LogMalfunctionStatus } from 'src/app/classes/LogMalfunctionStatus';
import { MalfunctionService } from 'src/app/services/malfunction.service';
import { Malfunction } from 'src/app/classes/malfunction';
import { malfunctionByComponentId } from 'src/app/classes/malfunctionByComponentId';
import { DataSource } from '@angular/cdk/table';
import { ComponentService } from 'src/app/services/component.service';
import { Router, NavigationEnd } from '@angular/router';
import { AddResponsibleComponent } from '../add-responsible/add-responsible.component';
import { MatDialog } from '@angular/material';
import { Components } from 'src/app/classes/component';
import { ShowMalDialogComponent } from '../show-mal-dialog/show-mal-dialog.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent {//implements OnInit {

  dataSource: Array<viewLog>
  displayedColumns: string[] = ['componentName', 'responsibleId', 'responsibleName', 'logMalfunctionStatusName', 'statusDescription'];
  ComponentChoose: any
  MalfunctionChoose: any
  ResponsibleChoose: any
  StatusChoose: any
  AllViewLogMalfunctionList: Array<viewLog> = []
  tempDataSource: Array<viewLog> = [] 
  param1: string = ""
  param2: string = ""
  demo: any
  dataSource2: Array<viewLog> = []
  lastFiler:string
  newFil:boolean=false
  first=true
  componentList = new Array<Components>()
  StatusList = new Array<LogMalfunctionStatus>()
  ResponsibleList = new Array<Responsible>()
  MalfunctionList = new Array<malfunctionByComponentId>()

  filter(val?: string) {
    if(val==null ||val==undefined)
    {
      this.newFil=true
      this.first=true
      this.ResponsibleChoose=undefined;
      this.StatusChoose=undefined;
      // document.getElementById("filterByResName")
    }
    this.tempDataSource = this.dataSource
    this.dataSource = []
    if(this.newFil==true)
    {
      this.newFil=false;

      this.dataSource=this.AllViewLogMalfunctionList
    }
    else{
    // if((this.lastFiler==undefined || this.lastFiler==val )&& this.first==true){      
    if(this.ResponsibleChoose==undefined && this.StatusChoose!=undefined ||
      this.ResponsibleChoose!=undefined && this.StatusChoose==undefined) 
      {
    this.dataSource= this.AllViewLogMalfunctionList.filter(
      x=>(this.ResponsibleChoose=="-All-")?
        x.responsibleName!="":x.responsibleName==this.ResponsibleChoose
      ||((this.StatusChoose=="-All-")?
        x.logMalfunctionStatusName!="":
           x.logMalfunctionStatusName==this.StatusChoose))
    }
      else{
        this.first=false
        this.dataSource= this.AllViewLogMalfunctionList.filter(
          x=>(this.ResponsibleChoose=="-All-")?
          x.responsibleName!="":x.responsibleName==this.ResponsibleChoose
          &&((this.StatusChoose=="-All-")?
          x.logMalfunctionStatusName!="":
           x.logMalfunctionStatusName==this.StatusChoose))
      }
    }
    this.lastFiler=val
  }


  clickedPassMap(element) {
    this.componentSer.getComponents(element.componentName, element.componentName).subscribe(
      d => {
        console.log("the result " + d)
        this.componentSer.componentClicked = d[0]
        // alert(this.componentSer.componentClicked.name)
        this.route.navigateByUrl("/tabs/esriMapComponent")
      },
      e => { }
    )
  }
    // this.componentSer.componentClicked=this.componentSer.componentsList.find(e=>e.name==element.componentName)

    // this.route.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };

    // this.route.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //     this.route.navigated = false;
    //     window.scrollTo(0, 0);
    //   }
    // });


  
  temp() {
    alert("AAAAAAAa!!!!!!!")
  }

  filterArray() {
    console.log(this.param1 + " , " + this.param2)
    var first = this.param1
    this.dataSource = []
    this.AllViewLogMalfunctionList.forEach(element => {
      if (element["first"] == this.param2)
        this.dataSource.push(element)
    });
  }
  filterByComponent()
  { 
    var id=this.componentList.find(x=>x.name==this.ComponentChoose).id
    const dialogRef=this.dialog.open(ShowMalDialogComponent,{
      height: '300px',
      width: '650px',
      data: {
        dataKey: id
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result!=undefined ||result !=null)
      {
        this.dataSource=this.AllViewLogMalfunctionList.filter(x=>x.malfunctionId==result)
      }
    })
  }


  constructor(private logMalfunctionSer: LogMalfunctionService,
    private userSer: UserService, private logMalSer: LogMalfunctionService, private malSer: MalfunctionService,
    private componentSer: ComponentService, private route: Router, private dialog: MatDialog,
    ) {

    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }
 
  ngOnInit() {
    
    this.dataSource = []
    this.logMalfunctionSer.getLogMalfunction().subscribe(
      d => {
        this.AllViewLogMalfunctionList = d
        this.dataSource = d;
      },
      e => { }
    )
    this.userSer.getResponsible().subscribe(
      d => { this.ResponsibleList = d },
      e => { console.log(e) }
    )
    this.logMalSer.getLogMalfunctionStatus().subscribe(
      d => { this.StatusList = d },
      e => { console.log(e) }
    )
    this.malSer.getMalfunction().subscribe(
      d => { this.MalfunctionList = d },
      e => { console.log(e) }
    )
    this.componentSer.getAllComponents().subscribe(
      d=>{this.componentList=d},
      e=>{console.log("cant get components "+e)}
    )

  }



  sortList(list) {
    var tmp;
    var f = true;
    var k;
    for (var i = 0; i < list.length - 1; i++) {
      for (var j = i + 1; j < list.length; j++) {
        if (this.compareDate2(list[i].event_date, list[j].event_date) == -1) {
          tmp = list[i];
          list[i] = list[j]
          list[j] = tmp;
        }
      }
    }
  }

  compareDate2(date1, date2) {
    if (parseInt(date1.substring(6)) < parseInt(date2.substring(6)))
      return -1;//change
    else if (parseInt(date1.substring(6)) > parseInt(date2.substring(6)))
      return 1;//dont change !!
    //same year
    else if (parseInt(date1.substring(3, 5)) < parseInt(date2.substring(3, 5)))
      return -1;//change
    else if (parseInt(date1.substring(3, 5)) > parseInt(date2.substring(3, 5)))
      return 1;//dont change
    //same year and same month
    else if (parseInt(date1.substring(0, 2)) < parseInt(date2.substring(0, 2)))
      return -1; //change 
    else if (parseInt(date1.substring(0, 2)) > parseInt(date2.substring(0, 2)))
      return 1;//dont change
    //same date
    else return 0;
  }
  addResponsible() {
    const dialogRef = this.dialog.open(AddResponsibleComponent, {
      height: '650px',
      width: '650px'
    })
    dialogRef.afterClosed().subscribe(result => {
    })

  }
}
