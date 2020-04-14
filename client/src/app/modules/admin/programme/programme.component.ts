import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-programme',
    templateUrl: './programme.component.html',
    styleUrls: ['./programme.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProgrammeComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
