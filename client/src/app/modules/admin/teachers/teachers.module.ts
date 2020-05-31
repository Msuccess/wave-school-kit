import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeacherListComponent } from './teacher-details/teacher-list/teacher-list.component';
import { TeacherSidebarFilterComponent } from './teacher-details/teacher-sidebar-filter/teacher-sidebar-filter.component';
import { TeacherSelectedTopBarComponent } from './teacher-details/teacher-selected-top-bar/teacher-selected-top-bar.component';

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
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

// ! Will be enabled after running yarn
import { MaterialFileInputModule, NGX_MAT_FILE_INPUT_CONFIG, FileInputConfig } from 'ngx-material-file-input';
import { CreateTeacherFormComponent } from './create-teacher-form/create-teacher-form.component';



const routes: Routes = [
  {
    path: '',
    component: TeacherDetailsComponent
  },
  {
    path: 'add',
    component: CreateTeacherFormComponent
  }
];

export const config: FileInputConfig = {
  sizeUnit: 'Octet'
};

@NgModule({
  declarations: [TeacherFormComponent, TeacherDetailsComponent, TeacherListComponent, TeacherSidebarFilterComponent, TeacherSelectedTopBarComponent, CreateTeacherFormComponent],
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
    MaterialFileInputModule,
    MatProgressBarModule,

    // * theme specific modules
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
  ],

  exports: [RouterModule],
  providers: [{ provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }],
  entryComponents: [
    TeacherFormComponent
  ]
})
export class TeachersModule { }
