import { Component, OnInit } from '@angular/core';
import { LogMalfunctionService } from 'src/app/services/log-malfunction.service';

@Component({
  selector: 'app-tab-reports',
  templateUrl: './tab-reports.component.html',
  styleUrls: ['./tab-reports.component.scss']
})
export class TabReportsComponent implements OnInit {

  constructor(private logMalfunctionSer:LogMalfunctionService) { }

  ngOnInit() {
  }

}
