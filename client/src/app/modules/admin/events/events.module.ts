import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatToolbarModule, MatTooltipModule, DateAdapter } from '@angular/material';

const routes: Routes = [
    {
        path: '',
        component: EventsComponent
    }
];

@NgModule({
    declarations: [EventsComponent],
    imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatToolbarModule, MatTooltipModule]
})
export class EventsModule {}
