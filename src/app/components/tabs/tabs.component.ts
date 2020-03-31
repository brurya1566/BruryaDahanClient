import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1; 
  constructor(private loginSer:UserService,private Router:Router) { 
    this.navLinks = [
      {
          label: 'maps',
          link: './esriMapComponent',
          index: 0
      }, {
          label: 'menager',
          link: './manager',
          index: 1
      },
      {
        label: 'service center',
        link: './ServerCenter',
        index: 1
    },
  ];   
  }

  ngOnInit() {
    // alert(this.loginSer.currentUser)
    // alert(this.loginSer.currentUser.roleId)
    this.Router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.Router.url));
  });
  }

}
