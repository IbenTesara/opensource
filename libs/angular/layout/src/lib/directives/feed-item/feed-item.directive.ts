import { Directive, HostListener, inject, input, InputSignal } from '@angular/core';

import { NgxFeedComponent } from '../../components';

@Directive({
	selector: '[ngxFeedItem]',
})
export class NgxFeedItemDirective {
	private parent: NgxFeedComponent = inject(NgxFeedComponent);

	@HostListener('visible', ['$event'])
  public onVisible ( event ) {
    console.log(event)
		if (this.parent.data().length === this.ngxFeedItem() + 1) {
			this.parent.endReached.emit();
    }

    console.log('Hello')
  }

	public ngxFeedItem: InputSignal<number> = input.required();
}
