import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchiveNoteDialogComponent } from './archive-note-dialog.component';

describe('ArchiveNoteDialogComponent', () => {
  let component: ArchiveNoteDialogComponent;
  let fixture: ComponentFixture<ArchiveNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveNoteDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiveNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
