import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog, MatSnackBarConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsComponent } from '../notifications/notifications.component';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    confirm: any;
    constructor(
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        public sanitizer: DomSanitizer
    ) {}

    alert(message: string, type: string, title?: string) {
        const alertType = type.toLowerCase();
        if (alertType.toLowerCase() === 'success') {
            setTimeout(() =>
                this.snackBar.openFromComponent(NotificationsComponent, {
                    data: {
                        message: message,
                        type: alertType
                    },
                    panelClass: 'notify-success'
                })
            );
        } else {
            setTimeout(() =>
                this.snackBar.openFromComponent(NotificationsComponent, {
                    data: {
                        message: message,
                        type: alertType
                    },
                    panelClass: 'notify-error',
                    duration: 3000
                })
            );
        }
    }

    openSnackBar(message: string, action: string) {
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'right';
        config.panelClass = 'style.background';
        this.snackBar.open(message, action, config);
    }
}
