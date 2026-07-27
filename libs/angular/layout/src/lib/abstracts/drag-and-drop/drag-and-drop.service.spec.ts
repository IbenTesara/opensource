import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { NgxWindowService } from '@ibenvandeveire/ngx-core';
import { Observable } from 'rxjs';

import { NgxAccessibleDragAndDropAbstractService } from './drag-and-drop.service';

@Injectable()
class TestDragAndDropService extends NgxAccessibleDragAndDropAbstractService {
	public get currentLanguage(): string | Observable<string> {
		return 'en';
	}
}

describe('NgxAccessibleDragAndDropAbstractService', () => {
	let service: TestDragAndDropService;
	let liveAnnouncerMock: { announce: jest.Mock };

	beforeEach(() => {
		liveAnnouncerMock = {
			announce: jest.fn(),
		};

		TestBed.configureTestingModule({
			providers: [
				TestDragAndDropService,
				{ provide: LiveAnnouncer, useValue: liveAnnouncerMock },
				{ provide: NgxWindowService, useValue: { isBrowser: () => true } },
			],
		});

		service = TestBed.inject(TestDragAndDropService);
	});

	it('should announce selected message via live region', () => {
		const spy = subscribeSpyTo(
			service.setMessage({
				type: 'selected',
				data: { item: '1', itemLabel: 'Task 1' } as any,
			})
		);

		expect(spy.getValues()).toEqual([null]);
		expect(liveAnnouncerMock.announce).toHaveBeenCalledWith(expect.stringContaining('Task 1'));
	});

	it('should append accessible description to parent element', () => {
		const parent = document.createElement('div');
		const spy = subscribeSpyTo(service.setDragAndDropDescription(parent));

		expect(spy.getValues()).toEqual([null]);
		expect(parent.hasAttribute('aria-describedby')).toBe(true);
		expect(parent.querySelector('p')).not.toBeNull();
	});
});
