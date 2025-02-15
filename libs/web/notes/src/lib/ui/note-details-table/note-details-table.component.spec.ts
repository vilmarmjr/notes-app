import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteDetailsTableComponent } from './note-details-table.component';

describe('NoteDetailsTableComponent', () => {
  let component: NoteDetailsTableComponent;
  let fixture: ComponentFixture<NoteDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteDetailsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
