import {
	ComponentRef,
	computed,
	Directive,
	ElementRef,
	inject,
	input,
	InputSignal,
	OnInit,
	Renderer2,
	Signal,
	ViewContainerRef,
} from '@angular/core';

import { NgxDisplayContentComponent } from '../../abstracts';
import { NgxLinkConfigurationToken } from '../../tokens';
import {
	NgxLinkConfiguration,
	NgxLinkContext,
	NgxLinkDestination,
	NgxLinkIconPosition,
	NgxLinkPriority,
	NgxLinkType,
} from '../../types';

/**
 * A directive that adds the classic link types, priority, context, destination and icon handling
 */
@Directive({
	selector: '[ngxLink]',
	host: {
		'[attr.class]': 'classes()',
		'[attr.target]': 'target()',
	},
})
export class NgxLinkDirective implements OnInit {
	/**
	 * An instance of the viewContainer
	 */
	protected readonly viewContainer: ViewContainerRef = inject(ViewContainerRef);

	/**
	 * An instance of the elementRef
	 */
	protected readonly elementRef: ElementRef<HTMLAnchorElement> = inject(
		ElementRef<HTMLAnchorElement>
	);

	/**
	 * An instance of the NativeElement
	 */
	protected readonly nativeElement = this.elementRef.nativeElement;

	/**
	 * An instance of the renderer
	 */
	protected readonly renderer: Renderer2 = inject(Renderer2);

	/**
	 * An optional set of configuration
	 */
	protected readonly configuration: NgxLinkConfiguration = inject(NgxLinkConfigurationToken, {
		optional: true,
	});

	/**
	 * The icon element in case we did not configure an icon component
	 */
	protected iconElement: HTMLElement;

	/**
	 * The icon component in case we did configure an icon component
	 */
	protected iconComponent: ComponentRef<NgxDisplayContentComponent>;

	/**
	 * The classes we set to the link
	 */
	protected readonly classes: Signal<string> = computed(() => {
		// Iben: Inserts the icon
		this.handleIcon();

		return `
    ngx-link
    ngx-link-${this.linkType()}
    ngx-link-${this.priority()}
    ngx-link-${this.destination()}
    ${this.context() ? `ngx-link-${this.context()}` : ''}
    ${this.icon() ? 'ngx-link-with-icon' : ''}
    `;
	});

	/**
	 * The target calculated based on the destination
	 */
	protected readonly target: Signal<string> = computed(() =>
		this.destination() === 'internal' ? '_self' : '_blank'
	);

	/**
	 * The visual type of the link, by default `text`.
	 *
	 * The options are `text`, `button` and `icon`.
	 */
	public readonly linkType: InputSignal<NgxLinkType> = input('text');

	/**
	 * The context in which the link is used, by default undefined.
	 *
	 * The options are `navigation`, `breadcrumb`, `anchor`, `form` and `footer`.
	 */
	public readonly context: InputSignal<NgxLinkContext> = input();

	/**
	 * The priority the link, by default `primary`.
	 *
	 * The options are `primary`, `secondary`, `tertiary` and `danger`.
	 */
	public readonly priority: InputSignal<NgxLinkPriority> = input('primary');

	/**
	 * The destination of the link, by default `internal`.
	 *
	 * The options are `internal` and `external`.
	 */
	public readonly destination: InputSignal<NgxLinkDestination> = input('internal');

	/**
	 * An optional icon we wish to show
	 */
	public readonly icon: InputSignal<unknown> = input();

	/**
	 * The position of the icon when provided, by default this is `left` unless overwritten in the configuration
	 *
	 * The options are `left` and `right`.
	 */
	public readonly iconPosition: InputSignal<NgxLinkIconPosition> = input('left');

	ngOnInit(): void {
		// Iben: Wrap the base text in an element
		const wrapperElement: HTMLSpanElement = this.renderer.createElement(
			this.configuration?.labelWrapper || 'span'
		);

		// Iben: Append all the child nodes
		this.nativeElement.childNodes.forEach((node) => {
			this.renderer.appendChild(wrapperElement, node);
		});

		this.renderer.setAttribute(wrapperElement, 'class', 'ngx-link-label');

		// Iben: Remove all the nodes
		this.nativeElement.childNodes.forEach((node) => {
			this.renderer.removeChild(wrapperElement, node);
		});

		// Iben: Remove the current innerHtml and replace it with a span element
		this.renderer.appendChild(this.nativeElement, wrapperElement);
	}

	/**
	 * Adds or removes an icon
	 */
	private handleIcon(): void {
		// Iben: Check if we need to add an icon
		if (this.icon()) {
			// Iben: Check if the link already has an icon, if not, add it
			if (!this.iconElement && !this.iconComponent) {
				// Iben: If no icon component exists, we create a regular i element
				if (!this.configuration?.icon) {
					// Iben: Create a new icon element
					this.iconElement = this.renderer.createElement('i');
					this.iconElement.className = `ngx-link-icon ${this.icon()}`;
				} else {
					// Iben: Create new component and add the icon
					this.iconComponent =
						this.viewContainer.createComponent<NgxDisplayContentComponent>(
							this.configuration.icon,
							{ index: 0 }
						);
					this.iconComponent.setInput('data', this.icon());
					this.renderer.addClass(
						this.iconComponent.instance.elementRef.nativeElement,
						'ngx-link-icon'
					);
				}

				// Iben: Add the icon depending on whether we want to add it on the left or the right
				this.iconPosition() === 'left'
					? this.renderer.insertBefore(
							this.nativeElement,
							this.iconElement ||
								this.iconComponent.instance.elementRef.nativeElement,
							this.nativeElement.firstChild
					  )
					: this.renderer.appendChild(
							this.nativeElement,
							this.iconElement || this.iconComponent.instance.elementRef.nativeElement
					  );
			}
		}
		// Iben: If an icon already exists and we no longer have an icon presented, we remove it
		else if (this.iconElement || this.iconComponent) {
			if (!this.configuration?.icon) {
				this.renderer.removeChild(this.nativeElement, this.iconElement);
				this.iconElement = undefined;
			} else {
				this.iconComponent?.destroy();
				this.iconComponent = undefined;
			}
		}
	}
}
