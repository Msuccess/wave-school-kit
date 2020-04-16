import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { NotificationService } from './services/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [NotificationsComponent],
    imports: [CommonModule, MatSnackBarModule],
    entryComponents: [NotificationsComponent],
    providers: [
        NotificationService,
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 3500,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            }
        }
    ]
})
export class SharedModule {}
