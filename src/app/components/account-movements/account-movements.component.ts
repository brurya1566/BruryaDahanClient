import { Component, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/services/component.service';
import { DatePipe } from '@angular/common'
import { MatTableDataSource } from '@angular/material/table';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { accountMovements, accountMovementsI } from 'src/app/classes/accountMovements';

@Component({
    selector: 'account-movements',
    templateUrl: './account-movements.component.html',
    styleUrls: ['./account-movements.component.css']
})

export class AccountMovementsComponent implements OnInit {
    skip: number;
    accountMovementsList: MatTableDataSource<any> = new MatTableDataSource<any>();
    accountMovementsListFiltered: Array<any> = new Array<any>();;
    branchList: any;
    branchListFiltered: any;
    PkReferenceCode: number;
    filter: any = { city: null, branch: null, name: null, date: { fromDate: null, toDate: null } }
    cityList: any;
    fileData: File = null;

    tableColumns: string[] = ['pkReferenceCode']//= ['accountNumber', 'branchCode', 'codeZchutChova', 'datePeilut', 'pkReferenceCode','subjectCode','sum'];
    constructor(private httpService: ComponentService, private datePipe: DatePipe, private MatDatepickerModule: MatDatepickerModule) {
        this.skip = 10;
    }
    ngOnInit() {
        this.getMoreMovements();
        this.httpService.GetBranchList().subscribe(res => {
            this.branchList = res;
            this.branchListFiltered = this.branchList;
        })
        this.httpService.GetCityList().subscribe(res => {
            this.cityList = res;
        })
    }
    filterListByDate = function () {
        this.accountMovementsListFiltered = this.accountMovementsList.filter(it => {
            return (this.filter.date.fromDate != null && this.filter.date.toDate != null && new Date(it.datePeilut).getTime() >= this.filter.date.fromDate.getTime() && new Date(it.datePeilut).getTime() <= this.filter.date.toDate.getTime());
        })
    }
    filterListByCity = function () {
        this.accountMovementsListFiltered = this.accountMovementsList.filter(it => {
            return this.branchListFiltered.some((item) => item.branchCode == it.branchCode)

        })
    }
    filterListByBranch = function () {
        this.accountMovementsListFiltered = this.accountMovementsList.filter(it => {
            return this.filter.branch != null && it.branchCode == this.filter.branch
        })
    }
    filterListByText = function () {
        this.accountMovementsListFiltered = this.accountMovementsList.filter(it => {
            return this.filter.name != null && it.branchCode == this.filter.name
        })
    }

    filterBranchList = function () {
        this.branchListFiltered = this.branchList;
        this.branchListFiltered = this.branchListFiltered.filter(it => {
            return it.cityCode == this.filter.city;
        })
    }
    getMoreMovements = function () {
        this.httpService.getAccountMovements(this.skip).subscribe(res => {
            this.accountMovementsList = res;
            this.accountMovementsListFiltered = res;
            this.skip += 10;
        }
        )
    };
    GetAccountMovementByPkReferenceCode = function () {
        this.httpService.GetAccountMovementByPkReferenceCode(this.PkReferenceCode).subscribe(res => {
            this.ItemByPkReferenceCode = res;
        })
    }
    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
    }
    uploadCheckImage = function () {
        const formData = new FormData();
        formData.append('file', this.fileData);
        this.httpService.uploadFile(formData).subscribe(res => {
            this.statusCode = res;
            if (res == 1)
                alert('SUCCESS !!');
        })
    }
}
