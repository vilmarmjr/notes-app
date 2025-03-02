import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesListSkeletonComponent } from './notes-list-skeleton.component';

describe('NotesListSkeletonComponent', () => {
  let component: NotesListSkeletonComponent;
  let fixture: ComponentFixture<NotesListSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesListSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
