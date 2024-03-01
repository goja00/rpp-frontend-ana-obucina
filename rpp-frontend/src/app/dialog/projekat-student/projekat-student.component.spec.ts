import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjekatStudentComponent } from './projekat-student.component';

describe('ProjekatStudentComponent', () => {
  let component: ProjekatStudentComponent;
  let fixture: ComponentFixture<ProjekatStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjekatStudentComponent]
    });
    fixture = TestBed.createComponent(ProjekatStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
