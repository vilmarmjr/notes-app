import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesMobileComponent } from './notes-mobile.component';

describe('NotesMobileComponent', () => {
  let component: NotesMobileComponent;
  let fixture: ComponentFixture<NotesMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
