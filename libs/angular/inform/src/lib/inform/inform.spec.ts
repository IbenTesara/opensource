import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Inform } from './inform';

describe('Inform', () => {
  let component: Inform;
  let fixture: ComponentFixture<Inform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inform],
    }).compileComponents();

    fixture = TestBed.createComponent(Inform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
