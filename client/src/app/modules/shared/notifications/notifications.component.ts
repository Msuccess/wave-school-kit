import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ConfirmOptions) {}
    type: string = 'success';

    ngOnInit(): void {}
}

export class ConfirmOptions {
    message?: any;
    type?: any;

    constructor(data?: any) {
        data = data || {};
        this.message = data.message || '';
        this.type = data.type || '';
    }
}
