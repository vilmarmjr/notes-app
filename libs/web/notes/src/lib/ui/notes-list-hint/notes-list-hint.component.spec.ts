import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesListHintComponent } from './notes-list-hint.component';

describe('NotesListHintComponent', () => {
  let component: NotesListHintComponent;
  let fixture: ComponentFixture<NotesListHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesListHintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesListHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
