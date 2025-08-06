import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NgxTooltipAbstractComponent } from '../../abstracts';
import { provideNgxTooltipConfiguration } from '../../providers';

import { NgxTooltipService } from './tooltip.service';

@Component({
	selector: 'test-tooltip',
	template: `{{ text }}`,
	standalone: true,
})
class TestTooltipComponent extends NgxTooltipAbstractComponent {}

describe('NgxTooltipService', () => {
	const overlayRef: any = {
		updatePositionStrategy: jest.fn(),
		attach: jest
			.fn()
			.mockReturnValue({ instance: { text: '', position: '', postionClass: '' }, setInput: jest.fn() }),
		detach: jest.fn(),
		hasAttached: jest.fn(),
	};
	const overlay: any = {
		create: jest.fn().mockReturnValue(overlayRef),
		scrollStrategies: {
			reposition: jest.fn(),
		},
	};
	const overlayPositionBuilder: any = {
		flexibleConnectedTo: jest.fn().mockReturnValue({
			withPositions: jest.fn(),
		}),
	};

	let service: NgxTooltipService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				NgxTooltipService,
				provideNgxTooltipConfiguration({
					component: TestTooltipComponent,
				}),
				{
					provide: Overlay,
					useValue: overlay,
				},
				{
					provide: OverlayPositionBuilder,
					useValue: overlayPositionBuilder,
				},
			],
		});
		service = TestBed.inject(NgxTooltipService);
	});

	it('should attach a tooltip', () => {
		service.showToolTip({ text: 'Hello', id: 'test', elementRef: {} as any });

		expect(overlay.create).toHaveBeenCalled();
		expect(overlayRef.attach).toHaveBeenCalled();
	});

	it('should remove a tooltip', () => {
		service.showToolTip({ text: 'Hello', id: 'test', elementRef: {} as any });
		service.removeToolTip();

		expect(overlayRef.detach).toHaveBeenCalled();
	});
});
