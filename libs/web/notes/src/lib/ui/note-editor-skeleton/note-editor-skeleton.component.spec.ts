import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteEditorSkeletonComponent } from './note-editor-skeleton.component';

describe('NoteEditorSkeletonComponent', () => {
  let component: NoteEditorSkeletonComponent;
  let fixture: ComponentFixture<NoteEditorSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteEditorSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteEditorSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
