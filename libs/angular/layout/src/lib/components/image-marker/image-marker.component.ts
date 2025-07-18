import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	OnChanges,
	OnDestroy,
	ViewChild,
	input,
	OutputEmitterRef,
	output,
} from '@angular/core';
import { NgxWindowService, simpleChangeHasChanged } from '@iben/ngx-core';
import { Subject, takeUntil, tap } from 'rxjs';

import { NgxImageMarkerService } from '../../services';
import {
	NgxImageMarker,
	NgxImageMarkerItem,
	NgxImageMarkerState,
	NgxImageMarkerTypes,
} from '../../types';

/**
 * A component wrapper for MarkerJs views
 *
 * https://markerjs.com/
 */

// TODO: Iben: Once we figured out how we'll share the FormAccessors with other packages, we should make this a ControlValueAccessor
@Component({
	selector: 'ngx-image-marker',
	template: `<img
		class="ngx-image-marker-image"
		#imageElement
		[alt]="imageDescription()"
		[src]="image()"
	/>`,
	styleUrl: './image-marker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'ngx-image-marker',
	},
})
export class NgxImageMarkerComponent implements AfterViewInit, OnChanges, OnDestroy {
	private readonly imageMarkerService: NgxImageMarkerService = inject(NgxImageMarkerService);
	private readonly windowService: NgxWindowService = inject(NgxWindowService);
	private readonly elementRef: ElementRef = inject(ElementRef);

	/**
	 * The currently created marker
	 */
	private currentMarker: NgxImageMarker;

	/**
	 * A subject holding the destroy state of the marker
	 */
	private readonly markerDestroyedSubject: Subject<void> = new Subject<void>();

	/**
	 * The rendered image element
	 */
	@ViewChild('imageElement') public readonly imageElement: ElementRef;

	/**
	 * The url to the image we wish to render
	 */
	public readonly image = input.required<string>();

	/**
	 * A WCAG/WAI-ARIA compliant description of the image
	 */
	public readonly imageDescription = input.required<string>();

	/**
	 * The start data we wish to render
	 */
	public readonly startState = input<NgxImageMarkerState>();

	/**
	 * Whether we can edit the view, by default this is true
	 */
	public readonly canEdit = input<boolean>(true);

	/**
	 * An optional current zoom level
	 */
	public readonly currentZoomLevel = input<number>();

	/**
	 * An optional amount of times we can zoom in and out
	 */
	public readonly zoomLevels = input<number[]>();

	/**
	 * An optional record of types of Markerjs markers we wish to render
	 */
	public readonly markerTypes = input<NgxImageMarkerTypes>();

	/**
	 * Emits when the state has been updated
	 */
	public stateUpdated: OutputEmitterRef<NgxImageMarkerState> = output<NgxImageMarkerState>();

	/**
	 * Emits when a marker is clicked when the view is in readonly mode
	 */
	public markerClicked: OutputEmitterRef<NgxImageMarkerItem> = output<NgxImageMarkerItem>();

	ngAfterViewInit(): void {
		// Iben: Create the initial marker
		this.createMarker();
	}

	ngOnChanges(changes: any): void {
		// Iben: If no marker exists or if the image has not rendered, early exit
		if (!this.currentMarker || !this.imageElement) {
			return;
		}

		// Iben: Check if there are changes to the state or the configuration when there is a marker
		const hasChanges =
			this.currentMarker &&
			(simpleChangeHasChanged(changes.startState) ||
				simpleChangeHasChanged(changes.canEdit) ||
				simpleChangeHasChanged(changes.markerTypes) ||
				simpleChangeHasChanged(changes.currentZoomLevel) ||
				simpleChangeHasChanged(changes.zoomLevels));

		// Iben: Recreate the marker whenever the configuration is adjusted
		if (!this.currentMarker || hasChanges) {
			this.createMarker();
		}
	}

	ngOnDestroy(): void {
		// Iben: Close the marker
		this.currentMarker.close();

		// Iben: Complete the destroy subject
		this.markerDestroyedSubject.next();
		this.markerDestroyedSubject.complete();
	}

	/**
	 * Creates a MarkerJs view based on the provided configuration
	 */
	private createMarker() {
		// Iben: Only create the image when we're in the browser
		this.windowService.runInBrowser(() => {
			// Iben: Close the existing marker if needed
			if (this.currentMarker) {
				this.currentMarker.close();
				this.markerDestroyedSubject.next();
			}

			// Iben: Create a new marker view based on the provided configuration
			const currentZoomLevel = this.currentZoomLevel();
			const zoomLevels = this.zoomLevels();
			this.currentMarker = this.imageMarkerService.createImageMarker(
				this.imageElement.nativeElement,
				this.elementRef.nativeElement,
				{
					mode: this.canEdit() ? 'edit' : 'view',
					allowZoom: true,
					defaultState: this.startState() || undefined,
					markerTypes: this.markerTypes(),
					zoom:
						currentZoomLevel !== undefined && zoomLevels
							? { current: currentZoomLevel, levels: zoomLevels }
							: undefined,
				}
			);

			// Iben: Listen to the valueChanges based on the provided type.
			if (this.currentMarker.mode === 'edit') {
				this.currentMarker.valueChanges
					.pipe(
						tap((value) => {
							this.stateUpdated.emit(value);
						}),
						takeUntil(this.markerDestroyedSubject)
					)
					.subscribe();
			} else {
				this.currentMarker.valueChanges
					.pipe(
						tap((value) => {
							this.markerClicked.emit(value);
						}),
						takeUntil(this.markerDestroyedSubject)
					)
					.subscribe();
			}
		});
	}
}
