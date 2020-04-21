import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentsSelectedTopBarComponent } from './student-details/students-selected-top-bar/students-selected-top-bar.component';
import { StudentSidebarFilterComponent } from './student-details/student-sidebar-filter/student-sidebar-filter.component';
import { StudentListComponent } from './student-details/student-list/student-list.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

const routes: Routes = [
    {
        path: '',
        component: StudentDetailsComponent
    },
    {
        path: 'add',
        component: StudentFormComponent
    }
];

@NgModule({
    declarations: [
        StudentFormComponent,
        StudentDetailsComponent,
        StudentsSelectedTopBarComponent,
        StudentSidebarFilterComponent,
        StudentListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatSelectModule,
        MatStepperModule,

        // * theme specific modules
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],

    exports: [RouterModule],
    providers: [],
    entryComponents: []
})
export class StudentModule {}
