import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestoredNoteToastComponent } from './restored-note-toast.component';

describe('RestoredNoteToastComponent', () => {
  let component: RestoredNoteToastComponent;
  let fixture: ComponentFixture<RestoredNoteToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestoredNoteToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RestoredNoteToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
