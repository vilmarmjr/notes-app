import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteBottomActionsComponent } from './note-bottom-actions.component';

describe('NoteBottomActionsComponent', () => {
  let component: NoteBottomActionsComponent;
  let fixture: ComponentFixture<NoteBottomActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteBottomActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteBottomActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
