import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteAsideActionsComponent } from './note-aside-actions.component';

describe('NoteAsideActionsComponent', () => {
  let component: NoteAsideActionsComponent;
  let fixture: ComponentFixture<NoteAsideActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteAsideActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteAsideActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
