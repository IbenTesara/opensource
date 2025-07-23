import { Pipe,PipeTransform,OutputEmitterRef } from '@angular/core';

@Pipe({
	name: 'ngxTableHasObservers',
	standalone: true,
})
export class NgxTableHasObserversPipe implements PipeTransform {
	/**
	 * Returns true in case an observer was set to an EventEmitter
	 *
	 * @param output - The provided EventEmitter
	 */
	public transform(output: OutputEmitterRef<unknown>): boolean {
		return output && output['listeners'].length > 0;
	}
}
