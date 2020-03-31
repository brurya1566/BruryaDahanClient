import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Responsible } from 'src/app/classes/responsible';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-responsible-list',
  templateUrl: './responsible-list.component.html',
  styleUrls: ['./responsible-list.component.scss']
})
export class ResponsibleListComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<ResponsibleListComponent>,private userSer:UserService) { }
  resList:Array<Responsible>=new Array<Responsible>()
  selected:any
  ngOnInit() {
    
    

    this.userSer.getResponsible().subscribe(d => {
      this.resList=d
      
    }, e => { })
  }
  change(row)
  {
    this.selected=row
    console.log(row)
  }
  ok()
  {
    this.dialogRef.close(this.selected)
  }



}
