import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeacherFormComponent } from './create-teacher-form.component';

describe('CreateTeacherFormComponent', () => {
  let component: CreateTeacherFormComponent;
  let fixture: ComponentFixture<CreateTeacherFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTeacherFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeacherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
