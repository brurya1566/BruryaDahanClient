import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HirarchiaService {
hirarchiaList:string[]=['cty','stn','flr','com','dir','num']
  constructor() { }
}
