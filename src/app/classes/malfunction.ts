import { MalfunctionStatus } from './malfunction-status';
import { Urgency } from './urgency';
import { Component } from '@angular/core';

export class Malfunction{
id:number;
component:Component
malfunctionStatus:MalfunctionStatus
malfunctionDescription:string
urgency:Urgency
}