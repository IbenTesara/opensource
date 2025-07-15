import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18n } from './i18n';

describe('I18n', () => {
  let component: I18n;
  let fixture: ComponentFixture<I18n>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18n],
    }).compileComponents();

    fixture = TestBed.createComponent(I18n);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
