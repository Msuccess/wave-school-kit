import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsSelectedTopBarComponent } from './students-selected-top-bar.component';

describe('StudentsSelectedTopBarComponent', () => {
  let component: StudentsSelectedTopBarComponent;
  let fixture: ComponentFixture<StudentsSelectedTopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsSelectedTopBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsSelectedTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
