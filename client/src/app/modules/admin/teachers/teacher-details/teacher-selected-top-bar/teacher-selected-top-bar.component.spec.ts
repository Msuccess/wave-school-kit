import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSelectedTopBarComponent } from './teacher-selected-top-bar.component';

describe('TeacherSelectedTopBarComponent', () => {
  let component: TeacherSelectedTopBarComponent;
  let fixture: ComponentFixture<TeacherSelectedTopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSelectedTopBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSelectedTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
