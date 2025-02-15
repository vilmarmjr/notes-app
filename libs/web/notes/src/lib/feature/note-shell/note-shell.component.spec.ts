import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteShellComponent } from './note-shell.component';

describe('NoteShellComponent', () => {
  let component: NoteShellComponent;
  let fixture: ComponentFixture<NoteShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
