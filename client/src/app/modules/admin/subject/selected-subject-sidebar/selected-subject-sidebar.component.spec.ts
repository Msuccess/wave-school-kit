import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSubjectSidebarComponent } from './selected-subject-sidebar.component';

describe('SelectedSubjectSidebarComponent', () => {
  let component: SelectedSubjectSidebarComponent;
  let fixture: ComponentFixture<SelectedSubjectSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedSubjectSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedSubjectSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
