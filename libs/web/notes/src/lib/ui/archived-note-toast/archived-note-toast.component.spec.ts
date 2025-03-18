import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchivedNoteToastComponent } from './archived-note-toast.component';

describe('ArchivedNoteToastComponent', () => {
  let component: ArchivedNoteToastComponent;
  let fixture: ComponentFixture<ArchivedNoteToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedNoteToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchivedNoteToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
