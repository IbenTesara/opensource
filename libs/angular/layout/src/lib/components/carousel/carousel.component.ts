import {
	ChangeDetectionStrategy,
	Component,
	input,
	InputSignal,
	signal,
	WritableSignal,
} from '@angular/core';

@Component({
	selector: 'ngx-carousel',
	templateUrl: './carousel.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxCarouselComponent<DataType = any> {
	protected currentSlide: WritableSignal<number> = signal(0);

	public readonly data: InputSignal<DataType[]> = input.required();

	public readonly type: InputSignal<'basic' | 'tabbed'> = input('basic');

	public setSlide(index: number): void {
		if (index < 0 || index > this.data().length) {
			console.error(
				'@ibenvandeveire/ngx-layout - NgxCarouselComponent: The index provided to the `setSlide` method is not in range of the data.'
			);

			return;
		}

		this.currentSlide.set(index);
	}
}
