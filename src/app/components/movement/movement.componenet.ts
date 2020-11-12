import { Component, Input } from '@angular/core';

import { accountMovements } from 'src/app/classes/accountMovements';

@Component({
    selector: 'movements-obj',
    templateUrl: './movement.componenet.html',
    // styleUrls: ['./account-movements.component.css']
})
export class MovementComponent {
    @Input() movement: accountMovements;
}