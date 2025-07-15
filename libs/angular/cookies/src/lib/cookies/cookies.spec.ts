import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cookies } from './cookies';

describe('Cookies', () => {
  let component: Cookies;
  let fixture: ComponentFixture<Cookies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cookies],
    }).compileComponents();

    fixture = TestBed.createComponent(Cookies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
