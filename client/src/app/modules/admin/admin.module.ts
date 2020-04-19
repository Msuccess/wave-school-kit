import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule, FuseSidebarModule } from '@fuse/components';
import { DashboardService } from './services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ClassComponent } from './class/class.component';
import { ProgrammeComponent } from './programme/programme.component';
import { TeacherComponent } from './teacher/teacher.component';
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
import { MatProgressBarModule } from '@angular/material';
import { ClassListComponent } from './class/class-list/class-list.component';
import { ClassFormComponent } from './class/class-form/class-form.component';

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
        loadChildren: () =>
            import('./student/student.module').then((m) => m.StudentModule)
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
        ClassComponent,
        ProgrammeComponent,
        TeacherComponent,
        SubjectComponent,
        SubjectListComponent,
        SelectedSubjectSidebarComponent,
        SubjectFormComponent,
        ClassListComponent,
        ClassFormComponent
    ],
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

        // * app modules

        // * theme specific modules
        FuseSharedModule,
        FuseWidgetModule
    ],
    providers: [DashboardService],
    entryComponents: [SubjectFormComponent],
    exports: [RouterModule]
})
export class AdminModule {}
