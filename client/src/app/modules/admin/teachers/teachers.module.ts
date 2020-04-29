import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeacherListComponent } from './teacher-details/teacher-list/teacher-list.component';
import { TeacherSidebarFilterComponent } from './teacher-details/teacher-sidebar-filter/teacher-sidebar-filter.component';
import { TeacherSelectedTopBarComponent } from './teacher-details/teacher-selected-top-bar/teacher-selected-top-bar.component';



@NgModule({
  declarations: [TeacherFormComponent, TeacherDetailsComponent, TeacherListComponent, TeacherSidebarFilterComponent, TeacherSelectedTopBarComponent],
  imports: [
    CommonModule
  ]
})
export class TeachersModule { }
