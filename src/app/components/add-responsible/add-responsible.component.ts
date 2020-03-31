import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import isIsraeliIdValid from 'israeli-id-validator';
import { Responsible } from 'src/app/classes/responsible';
import { ResponsibleService } from 'src/app/services/responsible.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
    selector: 'app-add-responsible',
    templateUrl: './add-responsible.component.html',
    styleUrls: ['./add-responsible.component.scss']
})
export class AddResponsibleComponent implements OnInit {

newResponsibleForm: FormGroup
constructor(private responsibleSer: ResponsibleService,private roleSer:RoleService) { }

ngOnInit() {
this.roleSer.getRoles().subscribe(
    d=>{
        this.roleSer.rolesList=d
    },
    e=>{
        alert("error cant get the roles from db")
    }
)
    this.createForm()
}
createForm() {
    this.newResponsibleForm = new FormGroup({
        idFG: new FormGroup({
            id: new FormControl("",
                [Validators.required, Validators.minLength(9),
                Validators.maxLength(9)])
        }),
        nameFG: new FormGroup({
            name: new FormControl("",
                [Validators.required])
        }),
        responsiblePasswordFG: new FormGroup({
            responsiblePassword: new FormControl("", [Validators.required])
        }),
        okPasswordFG: new FormGroup({ okPassword: new FormControl("", [Validators.required]) }),
        responsibleRoleFG:new FormGroup({
        responsibleRole:new FormControl("",[Validators.required])
        })
    });
}
get idFG() { return this.newResponsibleForm.get("idFG"); }
get id() { return this.idFG.get("id"); }

get nameFG() { return this.newResponsibleForm.get("nameFG"); }
get name() { return this.nameFG.get("name"); }

get responsiblePasswordFG() { return this.newResponsibleForm.get("responsiblePasswordFG"); }
get responsiblePassword() { return this.responsiblePasswordFG.get("responsiblePassword"); }

get okPasswordFG() { return this.newResponsibleForm.get("okPasswordFG"); }
get okPassword() { return this.okPasswordFG.get("okPassword"); }
get responsibleRoleFG() { return this.newResponsibleForm.get("responsibleRoleFG"); }
get responsibleRole() { return this.responsiblePasswordFG.get("responsibleRole"); }

notValidIsrId = false
validId()
{
    if(!isIsraeliIdValid(this.newResponsibleForm.value.idFG.id))
    {
      this.notValidIsrId=true
    }
    else{
      this.notValidIsrId=false
    }
}
ok(pass: string, pass2: string)
{
    if (pass != pass2) {
        alert("Password not verified")
    }
    else {
        var r: Responsible
        r = new Responsible()
        r.id = this.newResponsibleForm.value.idFG.id
        r.name=this.newResponsibleForm.value.nameFG.name
        r.responsiblePassword = this.newResponsibleForm.value.responsiblePasswordFG.responsiblePassword
        var nameRole=this.newResponsibleForm.value.responsibleRoleFG.responsibleRole
        r.role=this.roleSer.rolesList.find(e=>e.name==nameRole).id
        this.responsibleSer.addRes(r).subscribe(d=>{alert("responsible added successfully")
        close()
    },e=>{alert("error")})
        //todo: close popup

    }
}

}
