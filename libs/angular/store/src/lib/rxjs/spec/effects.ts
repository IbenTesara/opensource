import { inject, Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

import { handleEffect } from '../operators';

import { EffectsService } from './effects.service';
import { DataType, actions } from './store-assets';

@Injectable()
export class StoreEffects {
	private readonly actions$: Actions = inject(Actions);
	private readonly effectsService: EffectsService = inject(EffectsService);

	public fetchChannel$ = createEffect(() => {
		return this.actions$.pipe(
			handleEffect<DataType, boolean>(
				actions.channel,
				'set',
				this.effectsService.fetchChannel
			)
		);
	});

	public fetchVideos$ = createEffect(() => {
		return this.actions$.pipe(
			handleEffect<DataType[], string>(actions.videos, 'set', this.effectsService.fetchVideos)
		);
	});
}
