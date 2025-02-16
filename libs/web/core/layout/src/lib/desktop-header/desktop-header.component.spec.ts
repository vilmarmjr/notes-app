import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesktopHeaderComponent } from './desktop-header.component';

describe('DesktopHeaderComponent', () => {
  let component: DesktopHeaderComponent;
  let fixture: ComponentFixture<DesktopHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
