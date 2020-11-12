import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from "@angular/material/form-field"
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule, MatToolbarModule, MatButtonModule, MatTreeModule, MatSidenavModule, MatIconModule, MatListModule, MatStepperModule, MatRadioButton, MatRadioGroup } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccountMovementsComponent } from './components/account-movements/account-movements.component';
import { MovementComponent } from './components/movement/movement.componenet';
// import { FileUploader } from 'ng2-file-upload';
//  import { UploadFileComponent } from './components/upload-file/upload-file.component';
const appRoute: Routes = [
  { path: '', component: AccountMovementsComponent },
]
@NgModule({
  declarations: [AppComponent, AccountMovementsComponent, MovementComponent],//UploadFileComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatInputModule, MatDialogModule, MatFormFieldModule,
    FormsModule, ReactiveFormsModule, MatNativeDateModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatDatepickerModule, MatTabsModule, MatCheckboxModule, MatTableModule, MatMenuModule, MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    //FileUploader,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    HttpClientModule,
    MatRadioModule,
    MatTreeModule,
    MatCardModule,
    MatExpansionModule,
    RouterModule.forRoot(appRoute)
  ],
  exports: [RouterModule],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
