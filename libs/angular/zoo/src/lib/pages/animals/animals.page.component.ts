import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs';

import { NgxAnimalsPageAbstractComponent } from '../../abstracts';
import {
	NgxAnimalComponent,
	NgxContentItemComponent,
	NgxContentLinkComponent,
} from '../../components';
import {
	NgxAnimalSpecies,
	NgxDiet,
	NgxContinent,
	NgxConservationStatus,
	NgxZooSection,
} from '../../types';

@Component({
	selector: 'ngx-animals-page',
	templateUrl: './animals.page.component.html',
	imports: [
		NgxAnimalComponent,
		NgxContentItemComponent,
		NgxContentLinkComponent,
		ReactiveFormsModule,
	],
})
export class NgxZooAnimalsPageComponent extends NgxAnimalsPageAbstractComponent implements OnInit {
	/**
	 * An instance of the DestroyRef
	 */
	private readonly destroyRef: DestroyRef = inject(DestroyRef);

	/**
	 * A form group with all the filters for the animals list
	 */
	protected readonly filters: FormGroup = new FormGroup({
		species: new FormControl<NgxAnimalSpecies>(null),
		diet: new FormControl<NgxDiet>(null),
		continent: new FormControl<NgxContinent>(null),
		conservationStatus: new FormControl<NgxConservationStatus>(null),
		name: new FormControl<string>(null),
		section: new FormControl<string>(null),
	});

	protected readonly sections: Signal<NgxZooSection[]> = this.zooService.state.sections.data;

	public ngOnInit(): void {
		// Iben: Fetch the animals when the filters change
		this.filters.valueChanges
			.pipe(
				distinctUntilChanged(),
				// Iben: Debounce the filters changes to prevent excessive requests
				debounceTime(500),
				switchMap((value) => this.zooService.getAnimals('set', value)),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe();
	}
}
