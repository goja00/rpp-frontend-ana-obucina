import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmerDialogComponent } from './smer-dialog.component';

describe('SmerDialogComponent', () => {
  let component: SmerDialogComponent;
  let fixture: ComponentFixture<SmerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmerDialogComponent]
    });
    fixture = TestBed.createComponent(SmerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
