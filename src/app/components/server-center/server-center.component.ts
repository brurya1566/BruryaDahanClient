import { Component, OnInit } from '@angular/core';
import { ServiceCenterService } from 'src/app/services/service-center.service';
import { NewMalfunctionsToServiceCenter } from 'src/app/classes/newMalfunctionToServiceCenter';
import { ResponsibleListComponent } from '../responsible-list/responsible-list.component';
import { MatDialog } from '@angular/material';
import { addLogMalfunction } from 'src/app/classes/addLogMalfunction';
import { LogMalfunctionService } from 'src/app/services/log-malfunction.service';

@Component({
  selector: 'app-server-center',
  templateUrl: './server-center.component.html',
  styleUrls: ['./server-center.component.scss']
})
export class ServerCenterComponent implements OnInit {
   constructor(private serviceCenterSer: ServiceCenterService,
    private dialog:MatDialog,private logMalSer:LogMalfunctionService) { }
   dataSource: Array<NewMalfunctionsToServiceCenter> = []
   displayedColumns: string[] = ['id', 'componentName', 'malfunctionStatusName', 'malfunctionDescription', 'urgency', 'btn'];
 
   ngOnInit() {
     //this.dataSource = this.ELEMENT_DATA;
     if (this.serviceCenterSer.malfunctionList.length == 0) {
       this.serviceCenterSer.getNewMalfunctions().subscribe(
         D => { this.serviceCenterSer.malfunctionList = D 
          this.dataSource = this.serviceCenterSer.malfunctionList
        },
         E => { console.log(E) })
     }
     
   }
   newLog=new addLogMalfunction()
   inviteTechnician(element) {
    console.log(element)
    console.log("inviteTechnician")
    const dialogRef=this.dialog.open(ResponsibleListComponent,{
      height: '500px',
      width: '500px'
    })
    this.newLog.malfunctionId=element.malfunctionDTO_id
    dialogRef.afterClosed().subscribe(result=>{
      this.newLog.responsibleId=result.id
      this.newLog.logMalfunctionStatusId=2
      this.newLog.statusDescription=result.name+ " ordered"
      this.logMalSer.addLogMalfunction(this.newLog).subscribe(
        d=>{alert("added successfuly "+d)},
        e=>{alert(e)}
      )

    })   
  }
 }





 



    
