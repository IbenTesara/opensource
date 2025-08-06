import { Component } from '@angular/core';

import { NgxTourShowWhenDirective, NgxTourStepComponent } from '@lib/ngx-inform';

@Component({
	selector: 'tour-step',
	imports: [NgxTourShowWhenDirective],
	template: `
		<strong #stepTitle>
			{{ title() }}
		</strong>

		<p>
			{{ content() }}
		</p>

		<button *ngxTourShowWhen="'hasNext'" (click)="handleInteraction.emit('next')">Next</button>
		<button *ngxTourShowWhen="'hasPrevious'" (click)="handleInteraction.emit('back')">
			Back
		</button>
		<button (click)="handleInteraction.emit('close')">Close</button>
	`,
	styleUrl: './tour-step.component.scss',
})
export class TourStepComponent extends NgxTourStepComponent {}
