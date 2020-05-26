import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEditDetailsComponent } from './student-edit-details.component';

describe('StudentEditDetailsComponent', () => {
  let component: StudentEditDetailsComponent;
  let fixture: ComponentFixture<StudentEditDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEditDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
