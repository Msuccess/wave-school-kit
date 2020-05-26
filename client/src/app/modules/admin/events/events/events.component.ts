import { Component, OnInit } from '@angular/core';
import { CalendarEventAction, CalendarEvent } from 'angular-calendar';
import { MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
    actions: CalendarEventAction[];
    activeDayIsOpen: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef: any;
    events: CalendarEvent[];
    refresh: Subject<any> = new Subject();
    selectedDay: any;
    view: string;
    viewDate: Date;

    constructor() {
        // Set the defaults
        this.view = 'month';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = { date: startOfDay(new Date()) };

        //  this.actions = [
        //      {
        //          label  : '<i class="material-icons s-16">edit</i>',
        //          onClick: ({event}: { event: CalendarEvent }): void => {
        //              this.editEvent('edit', event);
        //          }
        //      },
        //      {
        //          label  : '<i class="material-icons s-16">delete</i>',
        //          onClick: ({event}: { event: CalendarEvent }): void => {
        //              this.deleteEvent(event);
        //          }
        //      }
        //  ];
    }

    ngOnInit() {}
}
