import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Classes/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userSer:UserService,private route:Router) { }
  name:string="";
  responsiblePassword:string="";


  ngOnInit() {
  }
  // conect()
  // {
  //   var user=new User()
  //   user.name=this.name
  //   user.responsiblePassword=this.responsiblePassword
  //   // user.id=this.userId
  //   this.userSer.checkUser(user).subscribe(
  //     d=>{
  //       if(d!=null){
  //       // this.userId=null;
  //         this.userSer.setcurrentUser(d[0])
  //         //this.userSer.setUserId(d.id)
  //         this.userSer.setName(this.name)
  //         this.userSer.setPassword(this.responsiblePassword)
  //         // alert("!!!!!!!!"+d)
  //        // this.route.navigateByUrl("/enter")
  //       //  alert("I is comming")
  //        this.route.navigateByUrl("/tabs")
  //        }
  //        else{
  //          alert(" משתמש אינו קיים,נא לחץ על צור משתמש!")
  //        }
  //       },
  //     e=>{alert("error!")}
  //   );
  // }
  conect()
  {
    var user=new User()
    user.name=this.name
    user.responsiblePassword=this.responsiblePassword
    // user.id=this.userId
    this.userSer.checkUser(user).subscribe(
      d=>{
        if(d[0]==null){alert("user does not exist!")}
        else{
        // this.userId=null;
          this.userSer.setcurrentUser(d[0])
          //this.userSer.setUserId(d.id)
          this.userSer.setName(this.name)
          this.userSer.setPassword(this.responsiblePassword)
          // alert("!!!!!!!!"+d)
         // this.route.navigateByUrl("/enter")
        //  alert("I is comming")
         this.route.navigateByUrl("/tabs/esriMapComponent")
         }
        },
      e=>{alert("error!")}
    );
  }

  // newUser()
  // {
  //   var user=new User();
  //   user.name=this.name
  //   user.responsiblePassword=this.responsiblePassword
  //   // user.id
  //   user.roleId=2
  //   this.userSer.addUserToDB(user).subscribe(
  //     myD=>{
  //       this.userSer.setLocalUser(myD.id,this.name,this.responsiblePassword)
  //      alert(this.userSer.name+" you added succesfuly!!! please press התחברות")
  //     //  this.route.navigateByUrl("enter")
  //   },
  //     myE=>{alert(myE.message)}
  //   );
  // }
}

