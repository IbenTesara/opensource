import {
	AfterViewInit,
	ChangeDetectorRef,
	ComponentRef,
	Directive,
	ElementRef,
	inject,
	Renderer2,
	TemplateRef,
	ViewContainerRef,
	input,
	DestroyRef,
	WritableSignal,
	signal,
	EmbeddedViewRef,
	Injector,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
	AbstractControl,
	FormGroupDirective,
	FormGroupName,
	ValidationErrors,
} from '@angular/forms';
import { tap } from 'rxjs';
import { v4 as uuid } from 'uuid';

import type { FieldState, ReadonlyFieldState, ValidationError } from '@angular/forms/signals';

import { NgxFormsErrorAbstractComponent } from '../../abstracts';
import { NgxFormsErrorsConfigurationToken } from '../../tokens';
import { NgxFormsErrorConfigurationOptions, NgxFormsErrorsControl } from '../../types';
import { controlStateListener } from '../../utils';

@Directive({
	selector: '[ngxFormsErrors]',
	standalone: true,
})
export class NgxFormsErrorsDirective implements AfterViewInit {
	protected errorViewContainer: EmbeddedViewRef<NgxFormsErrorAbstractComponent>;

	/**
	 *  An optional instance of the FormGroup directive
	 */
	protected readonly formGroupDirective: FormGroupDirective = inject(FormGroupDirective, {
		optional: true,
	});

	/**
	 *  An optional instance of the FormGroupName directive
	 */
	protected readonly formNameDirective: FormGroupName = inject(FormGroupName, { optional: true });

	/**
	 *  The optional global configuration used form the NgxFormsError
	 */
	private readonly config: NgxFormsErrorConfigurationOptions = inject(
		NgxFormsErrorsConfigurationToken,
		{ optional: true }
	);

	/**
	 *  An instance of the ViewContainerRef
	 */
	protected readonly viewContainer: ViewContainerRef = inject(ViewContainerRef);

	/**
	 *  An instance of the ElementRef
	 */
	protected readonly elementRef: ElementRef = inject(ElementRef);

	/**
	 *  An instance of Renderer2
	 */
	protected readonly renderer: Renderer2 = inject(Renderer2);

	/**
	 *  An instance of the TemplateRef
	 */
	protected readonly templateRef: TemplateRef<any> = inject(TemplateRef);

	/**
	 *  An instance of the ChangeDetectorRef
	 */
	protected readonly cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

	/**
	 *  An instance of the DestroyRef
	 */
	protected readonly destroyRef: DestroyRef = inject(DestroyRef);

	/**
	 *  An instance of the Injector used for converting Signal Form signals to RxJS streams
	 */
	protected readonly injector: Injector = inject(Injector);

	/**
	 *  Whether the control has errors
	 */
	protected hasErrors: WritableSignal<boolean> = signal(false);

	/**
	 *  A unique error id for aria association
	 */
	private readonly errorId = `ngx-forms-error-${uuid()}`;

	/**
	 *  The actual template of the input element
	 */
	private template: TemplateRef<any>;

	/**
	 * The AbstractControl we wish to listen to when using the directive
	 */
	private abstractControl: AbstractControl;

	/**
	 * The p element we add to the dom when no component is provided
	 */
	private errorsElement: any;

	/**
	 * The component to which the error data is added
	 */
	private errorComponent: NgxFormsErrorAbstractComponent;

	/**
	 * The ref of the component we wish to add error data to
	 */
	private componentRef: ComponentRef<NgxFormsErrorAbstractComponent>;

	/**
	 * A reference to a control or a string reference to the control (supports Reactive Forms & Signal Forms)
	 */
	public readonly control = input<NgxFormsErrorsControl>(undefined, {
		alias: 'ngxFormsErrors',
	});

	constructor() {
		// Iben: Set the current template ref at constructor time so we actually have the provided template (as done in the *ngIf directive)
		this.template = this.templateRef;
	}

	public ngAfterViewInit(): void {
		// Iben: Render the actual input so that it is always visible
		this.viewContainer.clear();
		this.viewContainer.createEmbeddedView(this.template);

		// Iben: Set a base class to the element
		const element: HTMLElement =
			this.templateRef.elementRef.nativeElement.previousElementSibling;

		if (element) {
			this.renderer.addClass(element, 'ngx-forms-errors-input');
		}

		// Iben: Resolve the control into an AbstractControl or FieldState
		const resolvedControl = this.resolveControl(this.control());
		if (!resolvedControl) {
			console.error('NgxForms: No control was provided to the NgxFormsErrorDirective');

			return;
		}

		// Iben: Store abstractControl if resolvedControl is an AbstractControl for backwards compatibility
		if (resolvedControl instanceof AbstractControl) {
			this.abstractControl = resolvedControl;
		}

		// Iben: Listen to state changes via controlStateListener utility and update directive state
		controlStateListener(resolvedControl, this.injector)
			.pipe(
				tap(({ invalid, touched, dirty, errors }) => {
					this.updateErrorState(invalid, touched, dirty, errors, element);
				}),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe();
	}

	/**
	 * Resolves the provided raw control input into an AbstractControl or Signal Form FieldState
	 *
	 * @param rawControl - The control input provided to the directive
	 */
	private resolveControl(
		rawControl: NgxFormsErrorsControl
	): AbstractControl | FieldState<any> | ReadonlyFieldState<any> | null {
		// Iben: Early exit if no control was passed
		if (!rawControl) {
			return null;
		}

		// Iben: If the control is a string, check the parent directive for the AbstractControl
		if (typeof rawControl === 'string') {
			return this.formGroupDirective
				? this.formGroupDirective.form.get(rawControl)
				: this.formNameDirective?.control.get(rawControl);
		}

		// Iben: If the control is an AbstractControl, return it directly
		if (rawControl instanceof AbstractControl) {
			return rawControl;
		}

		// Iben: If the control is a callable Field/FieldTree function, execute it to obtain the FieldState; otherwise return the FieldState object
		return typeof rawControl === 'function' ? (rawControl as Function)() : rawControl;
	}

	/**
	 * Updates the error state, DOM classes, ARIA attributes, and renders the error component/element
	 *
	 * @param isInvalid - Whether the control is invalid
	 * @param isTouched - Whether the control is touched
	 * @param isDirty - Whether the control is dirty
	 * @param errorsData - The raw errors data (ValidationErrors or ValidationError[])
	 * @param element - The host HTML element
	 */
	private updateErrorState(
		isInvalid: boolean,
		isTouched: boolean,
		isDirty: boolean,
		errorsData: ValidationErrors | ValidationError[] | null | undefined,
		element: HTMLElement
	): void {
		// Iben: Check whether we should show the error based on the provided config
		this.hasErrors.set(
			isInvalid && (this.config?.showWhen === 'touched' ? isTouched : isDirty)
		);

		// Iben: Set the errors class and aria attributes if needed
		if (element) {
			if (this.hasErrors()) {
				this.renderer.addClass(element, 'ngx-forms-errors-invalid');
				this.renderer.setAttribute(element, 'aria-invalid', 'true');

				// Iben: Add the errorId to the aria-describedby list if it's not present
				const currentDescribedBy = element.getAttribute('aria-describedby') || '';
				const ids = currentDescribedBy
					.split(' ')
					.map((id) => id.trim())
					.filter(Boolean);
				if (!ids.includes(this.errorId)) {
					ids.push(this.errorId);
					this.renderer.setAttribute(element, 'aria-describedby', ids.join(' '));
				}
			} else {
				this.renderer.removeClass(element, 'ngx-forms-errors-invalid');
				this.renderer.removeAttribute(element, 'aria-invalid');

				// Iben: Remove the errorId from the aria-describedby list if it is present
				const currentDescribedBy = element.getAttribute('aria-describedby') || '';
				const ids = currentDescribedBy
					.split(' ')
					.map((id) => id.trim())
					.filter(Boolean);
				if (ids.includes(this.errorId)) {
					const remainingIds = ids.filter((id) => id !== this.errorId);
					if (remainingIds.length > 0) {
						this.renderer.setAttribute(
							element,
							'aria-describedby',
							remainingIds.join(' ')
						);
					} else {
						this.renderer.removeAttribute(element, 'aria-describedby');
					}
				}
			}
		}

		// Iben: Show the error based on whether or not a component was provided
		if (!this.config?.component) {
			this.handleNoComponentFlow(this.hasErrors(), errorsData);
		} else {
			this.handleComponentRender(this.hasErrors(), errorsData);
		}

		// Iben: Detect the changes so this works with (nested) OnPush components
		this.cdRef.markForCheck();
	}

	/**
	 * Renders a provided custom component underneath the input component
	 *
	 * @param shouldShow - Whether the error should be shown
	 * @param errorsData - The error data to pass to the component
	 */
	private handleComponentRender(
		shouldShow: boolean,
		errorsData?: ValidationErrors | ValidationError[]
	) {
		// Iben: If the error should not be shown, we check if there's already an error component and destroy it if needed
		if (!shouldShow) {
			if (this.errorComponent) {
				this.componentRef.destroy();
				this.errorViewContainer?.destroy();
				this.errorViewContainer = undefined;
				this.componentRef = undefined;
				this.errorComponent = undefined;
			}

			return;
		}

		// Iben: If there already is a component, destroy it so it can update correctly
		if (this.componentRef) {
			this.componentRef.destroy();
			this.componentRef = undefined;
		}

		// Iben: Add the new component to the view
		this.componentRef = this.viewContainer.createComponent<NgxFormsErrorAbstractComponent>(
			this.config.component,
			{
				index: (this.config?.location || 'after') === 'after' ? 1 : 0,
			}
		);
		this.errorComponent = this.componentRef.instance;

		// Iben: Set the error id on the component element for ARIA
		this.renderer.setAttribute(this.componentRef.location.nativeElement, 'id', this.errorId);

		// Iben: Set the role to alert for immediate screen reader announcement
		this.renderer.setAttribute(this.componentRef.location.nativeElement, 'role', 'alert');

		// Iben: Set the data of the error component
		const { errors, errorKeys, data } = this.getErrors(errorsData);

		this.componentRef.setInput('errors', errors);
		this.componentRef.setInput('errorKeys', errorKeys);
		this.componentRef.setInput('data', data);
	}

	/**
	 * Renders a p tag underneath the input component when no custom component was provided
	 *
	 * @param shouldShow - Whether the error should be shown
	 * @param errorsData - The error data to render in the paragraph tag
	 */
	private handleNoComponentFlow(
		shouldShow: boolean,
		errorsData?: ValidationErrors | ValidationError[]
	) {
		// Iben: We remove the current errors so that we always have a new element to work with
		if (this.errorsElement) {
			this.renderer.removeChild(this.elementRef.nativeElement.parentNode, this.errorsElement);

			this.errorsElement = null;
		}

		// Iben: Early exit in case there's no error to show
		if (!shouldShow) {
			return;
		}

		// Iben: Create a new error paragraph
		this.errorsElement = this.renderer.createElement('p');
		this.renderer.setAttribute(this.errorsElement, 'class', 'ngx-forms-error');
		this.renderer.setAttribute(this.errorsElement, 'id', this.errorId);

		// Iben: Set the role to alert for immediate screen reader announcement
		this.renderer.setAttribute(this.errorsElement, 'role', 'alert');

		// Iben: Set the errors based on the keys
		this.renderer.setProperty(
			this.errorsElement,
			'innerHTML',
			this.getErrors(errorsData).errors.join(', ')
		);

		// Iben: insert the paragraph before or after the input component
		return (this.config?.location || 'after') === 'after'
			? this.renderer.insertBefore(
					this.elementRef.nativeElement.parentNode,
					this.errorsElement,
					this.renderer.nextSibling(this.elementRef.nativeElement)
			  )
			: this.renderer.insertBefore(
					this.elementRef.nativeElement.parentNode,
					this.errorsElement,
					this.elementRef.nativeElement.previousSibling
			  );
	}

	/**
	 * Returns the errors based on the provided settings for both Reactive Forms and Signal Forms
	 *
	 * @param data - The error data we wish to use (ValidationErrors or ValidationError[])
	 */
	private getErrors(data: ValidationErrors | ValidationError[] | null | undefined): {
		errors: string[];
		data: any;
		errorKeys: string[];
	} {
		// Iben: Early exit in case the errors object is null or undefined
		if (!data) {
			return {
				errors: [],
				data: null,
				errorKeys: [],
			};
		}

		let rawKeys: string[] = [];
		let rawMessages: string[] = [];

		// Iben: Extract keys and messages based on whether data is a Signal Forms array or Reactive Forms object
		if (Array.isArray(data)) {
			rawKeys = data.map((err) => err.kind);
			rawMessages = data.map(
				(err) => this.config?.errors?.[err.kind] ?? err.message ?? err.kind
			);
		} else {
			rawKeys = Object.keys(data);
			rawMessages = rawKeys.map((key) => this.config?.errors?.[key] ?? key);
		}

		// Iben: If the config is set to all, we always show all errors
		if (this.config?.show === 'all') {
			return {
				errors: rawMessages,
				errorKeys: rawKeys,
				data,
			};
		}

		// Iben: If no limit is provided, we default to a single error
		const limit = this.config?.show === undefined ? 1 : this.config.show;

		// Iben: Slice the errors based on the provided limit
		return {
			errors: rawMessages.slice(0, limit),
			errorKeys: rawKeys.slice(0, limit),
			data,
		};
	}
}
