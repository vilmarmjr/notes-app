import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoErrorComponent } from './info-error.component';

describe('InfoErrorComponent', () => {
  let component: InfoErrorComponent;
  let fixture: ComponentFixture<InfoErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
