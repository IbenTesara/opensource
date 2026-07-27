import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTooltipService } from '../../services';

import { NgxTooltipDirective } from './tooltip.directive';

@Component({
	template: `
		<button [ngxTooltip]="'Help text'" [ngxTooltipId]="'custom-tooltip-id'">Button</button>
	`,
	imports: [NgxTooltipDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {}

describe('NgxTooltipDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let tooltipServiceMock: { setToolTipEvent: jest.Mock; removeToolTip: jest.Mock };
	let buttonEl: HTMLButtonElement;

	beforeEach(() => {
		tooltipServiceMock = {
			setToolTipEvent: jest.fn(),
			removeToolTip: jest.fn(),
		};

		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxTooltipDirective],
			providers: [{ provide: NgxTooltipService, useValue: tooltipServiceMock }],
		});

		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
		buttonEl = fixture.nativeElement.querySelector('button');
	});

	it('should bind aria-describedby attribute and handle mouseenter/mouseleave events', () => {
		expect(buttonEl.getAttribute('aria-describedby')).toBe('custom-tooltip-id');

		buttonEl.dispatchEvent(new Event('mouseenter'));
		expect(tooltipServiceMock.setToolTipEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				text: 'Help text',
				id: 'custom-tooltip-id',
				active: true,
			})
		);

		buttonEl.dispatchEvent(new Event('mouseleave'));
		expect(tooltipServiceMock.setToolTipEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				id: 'custom-tooltip-id',
				active: false,
			})
		);
	});
});
