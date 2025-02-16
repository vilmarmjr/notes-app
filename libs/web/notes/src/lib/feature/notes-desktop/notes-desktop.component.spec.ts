import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesDesktopComponent } from './notes-desktop.component';

describe('NotesDesktopComponent', () => {
  let component: NotesDesktopComponent;
  let fixture: ComponentFixture<NotesDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesDesktopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
