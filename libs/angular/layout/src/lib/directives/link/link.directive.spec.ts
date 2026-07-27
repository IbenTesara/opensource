import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLinkDirective } from './link.directive';

@Component({
	template: `
		<a
			ngxLink
			[linkType]="type"
			[priority]="priority"
			[destination]="dest"
			[linkWidth]="width"
			[context]="ctx"
			[icon]="iconName"
		>
			Link Text
		</a>
	`,
	imports: [NgxLinkDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {
	public type = 'text';
	public priority = 'primary';
	public dest = 'internal';
	public width = 'fit';
	public ctx: string | undefined = undefined;
	public iconName: string | undefined = undefined;
}

describe('NgxLinkDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let anchorEl: HTMLAnchorElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxLinkDirective],
		});
		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
		anchorEl = fixture.nativeElement.querySelector('a');
	});

	it('should compute target as _self for internal destination and _blank for external', () => {
		expect(anchorEl.getAttribute('target')).toBe('_self');
		expect(anchorEl.getAttribute('rel')).toBeNull();

		fixture.componentInstance.dest = 'external';
		fixture.detectChanges();

		expect(anchorEl.getAttribute('target')).toBe('_blank');
		expect(anchorEl.getAttribute('rel')).toBe('noopener noreferrer');
	});

	it('should wrap link text in span label element', () => {
		const labelSpan = anchorEl.querySelector('.ngx-link-label');
		expect(labelSpan).not.toBeNull();
		expect(labelSpan.textContent).toContain('Link Text');
	});

	it('should compute CSS classes based on input properties', () => {
		expect(anchorEl.className).toContain('ngx-link');
		expect(anchorEl.className).toContain('ngx-link-text');
		expect(anchorEl.className).toContain('ngx-link-primary');
		expect(anchorEl.className).toContain('ngx-link-internal');
		expect(anchorEl.className).toContain('ngx-link-fit');
	});

	it('should render icon element when icon input is provided', () => {
		fixture.componentInstance.iconName = 'icon-arrow';
		fixture.detectChanges();

		const iconEl = anchorEl.querySelector('i.ngx-link-icon');
		expect(iconEl).not.toBeNull();
		expect(iconEl.className).toContain('icon-arrow');
		expect(anchorEl.className).toContain('ngx-link-with-icon');
	});
});
