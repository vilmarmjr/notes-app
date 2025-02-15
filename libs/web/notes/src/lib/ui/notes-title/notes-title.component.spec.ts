import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesTitleComponent } from './notes-title.component';

describe('NotesTitleComponent', () => {
  let component: NotesTitleComponent;
  let fixture: ComponentFixture<NotesTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
