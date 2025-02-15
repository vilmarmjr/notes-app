import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteTopActionsComponent } from './note-top-actions.component';

describe('NoteTopActionsComponent', () => {
  let component: NoteTopActionsComponent;
  let fixture: ComponentFixture<NoteTopActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteTopActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteTopActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
