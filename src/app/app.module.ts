import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog'
import {MatFormFieldModule} from "@angular/material/form-field"
import { AppComponent } from "./app.component";
import { EsriMapComponent } from "./components/esri-map/esri-map.component";
import { MalfunctionReportComponent } from './components/malfunction-report/malfunction-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {MatRippleModule, MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import  {MatMenuModule, MatToolbarModule, MatButtonModule, MatTreeModule,MatSidenavModule, MatIconModule, MatListModule, MatStepperModule, MatRadioButton, MatRadioGroup} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ManagerComponent } from './components/manager/manager.component';
import { LogMalfunctionComponent } from './components/log-malfunction/log-malfunction.component';
import { LogMalfunction } from './classes/logMalfunction';
import { TabReportsComponent } from './components/tab-reports/tab-reports.component';
import {MatRadioModule} from '@angular/material/radio';
import { group } from 'console';
import { ServerCenterComponent } from './components/server-center/server-center.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateReportComponent } from './components/update-report/update-report.component';
import { ResponsibleListComponent } from './components/responsible-list/responsible-list.component';
import { AddResponsibleComponent } from './components/add-responsible/add-responsible.component';
import { ShowMalDialogComponent } from './components/show-mal-dialog/show-mal-dialog.component';


const appRoute: Routes = [
  //{path:'',component:MalfunctionReportComponent},
  { path: '', component: LoginComponent },
  { path: "tabReports", component: TabReportsComponent },
  {
    path: "tabs", component: TabsComponent, children: [
      { path: "esriMapComponent", component: EsriMapComponent },
      { path: "manager", component: ManagerComponent },
      { path: "ServerCenter", component: ServerCenterComponent }
    ]
  },
  { path: "updateReport", component: UpdateReportComponent },
  { path: "ResponsibleList", component: ResponsibleListComponent },
  { path: "AddResponsible", component: AddResponsibleComponent },
  {path:"showMaldialog",component:ShowMalDialogComponent}
  //{path:"malfunctionReport",component:MalfunctionReportComponent},
  //{path:"logMalfunction",component:LogMalfunctionComponent}
]
@NgModule({
  declarations: [AppComponent, EsriMapComponent, MalfunctionReportComponent, ManagerComponent, LogMalfunctionComponent, TabReportsComponent, ServerCenterComponent, TabsComponent, LoginComponent, UpdateReportComponent,ResponsibleListComponent,AddResponsibleComponent, ShowMalDialogComponent],// AddResponsibleComponent],
  imports: [BrowserModule, BrowserAnimationsModule,MatInputModule,MatDialogModule,MatFormFieldModule,
    FormsModule,ReactiveFormsModule,MatNativeDateModule,MatRippleModule,MatSelectModule,MatSnackBarModule,
    MatDatepickerModule,MatTabsModule,MatCheckboxModule,MatTableModule,MatMenuModule,MatToolbarModule, 
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule ,
    MatStepperModule,
    HttpClientModule,
    MatRadioModule,
    MatTreeModule,
    RouterModule.forRoot(appRoute)
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
