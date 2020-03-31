import { Component, OnInit, Inject, Optional } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material'
import { MalfunctionService } from 'src/app/services/malfunction.service';
import { malfunctionByComponentId } from 'src/app/classes/malfunctionByComponentId';
@Component({
  selector: 'app-show-mal-dialog',
  templateUrl: './show-mal-dialog.component.html',
  styleUrls: ['./show-mal-dialog.component.scss']
})
export class ShowMalDialogComponent implements OnInit {

  malfunctionByComList:Array<malfunctionByComponentId>=new Array<malfunctionByComponentId>()
  constructor(private malSer:MalfunctionService,
    private matDialog:MatDialogRef<ShowMalDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {  }
  ngOnInit() {
    this.malSer.getMalfunctionByComponentId(this.data.dataKey).subscribe(
      d=>{this.malfunctionByComList=d},
      e=>{console.log("cant bring mal by com "+e)}
    )
  }
  malLog(mal:malfunctionByComponentId)
  {
    this.matDialog.close(mal.id)
  }
}