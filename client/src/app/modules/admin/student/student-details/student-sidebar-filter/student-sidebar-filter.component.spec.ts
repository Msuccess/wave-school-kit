import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSidebarFilterComponent } from './student-sidebar-filter.component';

describe('StudentSidebarFilterComponent', () => {
  let component: StudentSidebarFilterComponent;
  let fixture: ComponentFixture<StudentSidebarFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSidebarFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSidebarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
