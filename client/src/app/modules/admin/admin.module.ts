import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule, FuseSidebarModule } from '@fuse/components';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ClassComponent } from './class/class.component';
import { ProgrammeComponent } from './programme/programme.component';
import { SubjectComponent } from './subject/subject.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { SelectedSubjectSidebarComponent } from './subject/selected-subject-sidebar/selected-subject-sidebar.component';
import { SubjectFormComponent } from './subject/subject-form/subject-form.component';
import { MatProgressBarModule, MatChipsModule } from '@angular/material';
import { ClassListComponent } from './class/class-list/class-list.component';
import { ClassFormComponent } from './class/class-form/class-form.component';
import { TeachersModule } from './teachers/teachers.module';

// ! will be enabled after yarn has been runned.....
import { MaterialFileInputModule } from 'ngx-material-file-input';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'class',
        component: ClassComponent
    },
    {
        path: 'subject',
        component: SubjectComponent
    },
    {
        path: 'student',
        loadChildren: () => import('./student/student.module').then((m) => m.StudentModule)
    }
];

@NgModule({
    declarations: [DashboardComponent, ClassComponent, ProgrammeComponent, SubjectComponent, SubjectListComponent, SelectedSubjectSidebarComponent, SubjectFormComponent, ClassListComponent, ClassFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        // * material items
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        FuseSidebarModule,
        MatCheckboxModule,
        MatRippleModule,
        MatDatepickerModule,
        MatInputModule,
        MatTableModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatChipsModule,

        // ! will be enabled after yarn has been runned.....
        MaterialFileInputModule,

        // * app modules

        // * theme specific modules
        FuseSharedModule,
        FuseWidgetModule,
        TeachersModule
    ],
    providers: [],
    entryComponents: [SubjectFormComponent, ClassFormComponent],
    exports: [RouterModule]
})
export class AdminModule {}
