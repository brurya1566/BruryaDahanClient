import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Malfunction } from 'src/app/classes/malfunction';
import { UrgencyService } from 'src/app/services/urgency.service';
import { Urgency } from 'src/app/classes/urgency';
import { MalfunctionService } from 'src/app/services/malfunction.service';
import { addMalfunction } from 'src/app/classes/addMalfunction';
import { ComponentService } from 'src/app/services/component.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-malfunction-report',
  templateUrl: './malfunction-report.component.html',
  styleUrls: ['./malfunction-report.component.scss']
})
export class MalfunctionReportComponent implements OnInit {

  Description=""
  urgency=""
  newMalfunction:addMalfunction
  constructor(private urgencySer:UrgencyService,private malfunctionSer:MalfunctionService
    ,private componentSer:ComponentService,private userSer:UserService,private matDialogRef:MatDialogRef<MalfunctionReportComponent>) { }

  
  ngOnInit() {
    
  }
  submit(){
    this.newMalfunction=new addMalfunction()
    this.newMalfunction.malfunctionDescription=this.Description
    //console.log(this.urgency)
    //console.log()
    // console.log(this.urgencySer.urgencyLevelList[0].urgencyName)
    //this.newMalfunction.urgencyId=this.urgency.id
    //console.log(this.urgencySer.urgencyLevelList.find((e)=>e.urgencyName==this.urgency))
    this.newMalfunction.urgencyId=this.urgencySer.urgencyLevelList.find((e)=>e.urgencyName==this.urgency).id
    //this.newMalfunction.componentId=this.malfunctionSer.addNewMalfunction.componentId 
    this.newMalfunction.componentId=this.componentSer.currentComponent.id
    this.newMalfunction.responsibleId=this.userSer.currentUser.id
    this.malfunctionSer.addMalfunction(this.newMalfunction).subscribe(
      d=>{
        this.newMalfunction.id=d[0]
        console.log("you added malfunction with id: "+d[0])
        this.matDialogRef.close("added")
      },
      e=>{}
    )
  }

  
}
