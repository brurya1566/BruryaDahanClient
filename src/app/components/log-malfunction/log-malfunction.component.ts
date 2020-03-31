import { Component, OnInit } from '@angular/core';
import { addLogMalfunction } from 'src/app/classes/addLogMalfunction';
import { LogMalfunctionService } from 'src/app/services/log-malfunction.service';
import { malfunctionByComponentId } from 'src/app/classes/malfunctionByComponentId';
import { MalfunctionStatusService } from 'src/app/services/malfunction-status.service';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UpdateReportComponent } from '../update-report/update-report.component';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-log-malfunction',
  templateUrl: './log-malfunction.component.html',
  styleUrls: ['./log-malfunction.component.scss']
})
export class LogMalfunctionComponent implements OnInit {
  constructor(private logMalfunctionSer:LogMalfunctionService,
    private MalfunctionStatusSer:MalfunctionStatusService,
    private matDialogRef:MatDialogRef<LogMalfunctionComponent>, private dialog:MatDialog,
    private _snackBar:MatSnackBar) { }
//  mal:malfunctionByComponentId[]
 displayedColumns: string[] = ['update','malfunctionDescription','componentName']
 dataSource = new MatTableDataSource<malfunctionByComponentId>(this.logMalfunctionSer.malfunctionComponent);
 selection = new SelectionModel<malfunctionByComponentId>(true, []);
 selectedRow:any
 update:malfunctionByComponentId=null
 status:string=""
 description:string=""
  ngOnInit() {
  //  this.mal=this.logMalfunctionSer.malfunctionComponent
  }
  addLogMalfunctionExemple:addLogMalfunction=new addLogMalfunction()
  clickedInsertLog(e:malfunctionByComponentId){
    this.update=e
    const dialogRef=this.dialog.open(UpdateReportComponent,{
      height: '500px',
      width: '500px'
    })

    dialogRef.afterClosed().subscribe(result=>{
      result.malfunctionId=e.id
      this.logMalfunctionSer.addLogMalfunction(result).subscribe(
        D=>{
          this._snackBar.open("The update saved successfully!",null,{duration:3000})
          this.matDialogRef.close()
       },
        E=>{console.log(E)}
      )
    })
    // this.matDialogRef.close(this.changedRadio);
  }
  selection3 = new SelectionModel<malfunctionByComponentId>(false, []);
  changedRadio:any
  changed(row)
  {
    row=!row
    this.changedRadio=row
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: malfunctionByComponentId): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
