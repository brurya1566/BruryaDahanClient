import { Component, OnInit } from '@angular/core';
import { addLogMalfunction } from 'src/app/classes/addLogMalfunction';
import { LogMalfunctionService } from 'src/app/services/log-malfunction.service';
import { MalfunctionStatusService } from 'src/app/services/malfunction-status.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material';
import { UrgencyService } from 'src/app/services/urgency.service';

@Component({
  selector: 'app-update-report',
  templateUrl: './update-report.component.html',
  styleUrls: ['./update-report.component.scss']
})
export class UpdateReportComponent implements OnInit {
  description:string=""
  status:string=""
  addLogMalfunctionExemple:addLogMalfunction=new addLogMalfunction()
  constructor(private logMalfunctionSer:LogMalfunctionService,private MalfunctionStatusSer:MalfunctionStatusService,
    private UserSer:UserService,private matDialogRef:MatDialogRef<UpdateReportComponent>,
 private urgencySer:UrgencyService) { }
  ngOnInit() {
  }
  submit(){
    // this.addLogMalfunctionExemple.malfunctionId=this.logMalfunctionSer.malfunctionComponent[0].id//i need to get the correct malfunction
    // this.addLogMalfunctionExemple.responsibleId="123456789"
    // this.addLogMalfunctionExemple.logMalfunctionStatusId=this.MalfunctionStatusSer.malfunctionStatusList.find(e=>e.malfunctionStatusName=this.status).id
    // this.addLogMalfunctionExemple.statusDescription=this.description
    
    // this.logMalfunctionSer.addLogMalfunction(this.addLogMalfunctionExemple).subscribe(
    //   d=>{
    //     console.log(d[0])
    //   },
    //   e=>{}
    // )
    this.addLogMalfunctionExemple.responsibleId=this.UserSer.currentUser.id
    this.addLogMalfunctionExemple.logMalfunctionStatusId=this.MalfunctionStatusSer.malfunctionStatusList.find(e=>e.malfunctionStatusName=this.status).id
    this.addLogMalfunctionExemple.statusDescription=this.description
    this.matDialogRef.close(this.addLogMalfunctionExemple)
  }
}
