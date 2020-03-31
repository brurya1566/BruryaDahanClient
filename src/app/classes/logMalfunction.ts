import { LogMalfunctionStatus } from './LogMalfunctionStatus'
import { Malfunction } from './malfunction'
import { Responsible } from './responsible'

export class LogMalfunction{
id:number
malfunction:Malfunction
responsible:Responsible
logMalfunctionStatus:LogMalfunctionStatus
statusDescription:string
}