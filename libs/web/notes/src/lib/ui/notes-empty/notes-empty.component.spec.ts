import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesEmptyComponent } from './notes-empty.component';

describe('NotesEmptyComponent', () => {
  let component: NotesEmptyComponent;
  let fixture: ComponentFixture<NotesEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesEmptyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
