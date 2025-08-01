import { MarkerBase as ViewMarkerBase } from 'markerjs-live';
import { MarkerAreaState, MarkerBase } from 'markerjs2';
import { Observable } from 'rxjs';

/**
 * The state of the marker view
 */
export type NgxImageMarkerState = MarkerAreaState;

/**
 * A marker on the marker view
 */
export type NgxImageMarkerItem = MarkerBase;

/**
 * A record with the marker types we wish to show, both for the view and the edit mode
 */
export interface NgxImageMarkerTypes {
	edit: (typeof MarkerBase)[];
	view: (typeof ViewMarkerBase)[];
}

/**
 * Configuration for the marker view
 */
export interface NgxImageMarkerConfiguration {
	/**
	 * Whether the record is readonly or not
	 */
	mode: 'view' | 'edit';
	/**
	 * The state the view has to start from
	 */
	defaultState: NgxImageMarkerState;
	/**
	 * Whether zooming in is allowed, by default false
	 */
	allowZoom?: boolean;
	/**
	 * Whether clearing the marker view is allowed, by default false
	 */
	allowClear?: boolean;
	/**
	 * An optional set of allowed marker types, by default all
	 */
	markerTypes?: NgxImageMarkerTypes;

	/**
	 * An optional set of allowed marker types, by default the levels are [1,2,3,4] and the current zoom is 1
	 */
	zoom?: {
		levels: number[];
		current: number;
	};
}

interface NgxImageMarkerBase {
	mode: 'view' | 'edit';
	close: () => void;
}

export interface NgxImageMarkerView extends NgxImageMarkerBase {
	mode: 'view';
	valueChanges: Observable<NgxImageMarkerItem>;
}

export interface NgxImageMarkerEdit extends NgxImageMarkerBase {
	mode: 'edit';
	valueChanges: Observable<MarkerAreaState>;
}

/**
 * An Angular wrapper for markerjs views
 */
export type NgxImageMarker = NgxImageMarkerEdit | NgxImageMarkerView;
