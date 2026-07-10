import { TestBed } from '@angular/core/testing';

import { NgxTableConfigurationToken } from '../../tokens';

import { NgxTableAriaLabelPipe } from './table-aria-label.pipe';

describe('NgxTableAriaLabelPipe', () => {
	// Iben: Test with default/empty configuration
	describe('with default configuration', () => {
		let pipe: NgxTableAriaLabelPipe;

		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [NgxTableAriaLabelPipe],
			});
			pipe = TestBed.inject(NgxTableAriaLabelPipe);
		});

		it('should return default English fallbacks when no config is provided', () => {
			expect(pipe.transform(undefined, 'select')).toBe('Select all rows');
			expect(pipe.transform(0, 'select')).toBe('Select row 1');
			expect(pipe.transform(1, 'expand')).toBe('Expand row 2');
			expect(pipe.transform(2, 'collapse')).toBe('Collapse row 3');
		});

		it('should prioritize component-level labels over fallbacks', () => {
			const config = {
				selectAll: 'Custom Select All',
				selectRow: 'Custom Select Row',
				expandRow: (index: number) => `Custom Expand ${index}`,
				collapseRow: (index: number) => `Custom Collapse ${index}`,
			};

			expect(pipe.transform(undefined, 'select', config)).toBe('Custom Select All');
			expect(pipe.transform(0, 'select', config)).toBe('Custom Select Row');
			expect(pipe.transform(1, 'expand', config)).toBe('Custom Expand 1');
			expect(pipe.transform(2, 'collapse', config)).toBe('Custom Collapse 2');
		});
	});

	// Iben: Test with global configuration
	describe('with global configuration', () => {
		let pipe: NgxTableAriaLabelPipe;

		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					NgxTableAriaLabelPipe,
					{
						provide: NgxTableConfigurationToken,
						useValue: {
							ariaLabels: {
								selectAll: 'Global Select All',
								selectRow: 'Global Select Row',
								expandRow: (index: number) => `Global Expand ${index}`,
								collapseRow: (index: number) => `Global Collapse ${index}`,
							},
						},
					},
				],
			});
			pipe = TestBed.inject(NgxTableAriaLabelPipe);
		});

		it('should fallback to global configuration when component-level is not provided', () => {
			expect(pipe.transform(undefined, 'select')).toBe('Global Select All');
			expect(pipe.transform(0, 'select')).toBe('Global Select Row');
			expect(pipe.transform(1, 'expand')).toBe('Global Expand 1');
			expect(pipe.transform(2, 'collapse')).toBe('Global Collapse 2');
		});

		it('should prioritize component-level labels over global configuration', () => {
			const config = {
				selectAll: 'Component Select All',
				selectRow: 'Component Select Row',
				expandRow: (index: number) => `Component Expand ${index}`,
				collapseRow: (index: number) => `Component Collapse ${index}`,
			};

			expect(pipe.transform(undefined, 'select', config)).toBe('Component Select All');
			expect(pipe.transform(0, 'select', config)).toBe('Component Select Row');
			expect(pipe.transform(1, 'expand', config)).toBe('Component Expand 1');
			expect(pipe.transform(2, 'collapse', config)).toBe('Component Collapse 2');
		});
	});
});
