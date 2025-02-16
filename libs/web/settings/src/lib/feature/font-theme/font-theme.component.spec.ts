import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontThemeComponent } from './font-theme.component';

describe('FontThemeComponent', () => {
  let component: FontThemeComponent;
  let fixture: ComponentFixture<FontThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontThemeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FontThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
