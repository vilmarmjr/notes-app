import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestoreNoteDialogComponent } from './restore-note-dialog.component';

describe('RestoreNoteDialogComponent', () => {
  let component: RestoreNoteDialogComponent;
  let fixture: ComponentFixture<RestoreNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestoreNoteDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RestoreNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
