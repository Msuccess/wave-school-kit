import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSidebarFilterComponent } from './teacher-sidebar-filter.component';

describe('TeacherSidebarFilterComponent', () => {
  let component: TeacherSidebarFilterComponent;
  let fixture: ComponentFixture<TeacherSidebarFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSidebarFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSidebarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
