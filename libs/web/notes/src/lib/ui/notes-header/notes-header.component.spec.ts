import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesHeaderComponent } from './notes-header.component';

describe('NotesHeaderComponent', () => {
  let component: NotesHeaderComponent;
  let fixture: ComponentFixture<NotesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
