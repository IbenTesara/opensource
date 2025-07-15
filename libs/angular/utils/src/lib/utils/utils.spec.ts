import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Utils } from './utils';

describe('Utils', () => {
  let component: Utils;
  let fixture: ComponentFixture<Utils>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Utils],
    }).compileComponents();

    fixture = TestBed.createComponent(Utils);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
