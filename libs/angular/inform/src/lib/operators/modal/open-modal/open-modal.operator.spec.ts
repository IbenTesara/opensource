import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { finalize, of, take } from 'rxjs';

import { NgxModalAbstractComponent } from '../../../abstracts';
import { NgxModalServiceMock } from '../../../mocks';
import { NgxModalService } from '../../../services';

import { openNgxModal } from './open-modal.operator';

@Component({
	selector: 'test-modal',
	template: '',
})
class TestModalComponent extends NgxModalAbstractComponent<'Hello'> {}

describe('showNgxModal', () => {
	let service: NgxModalService;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [NgxModalServiceMock(jest.fn())] });

		service = TestBed.inject(NgxModalService);
	});

	it('should open a modal', (done) => {
		const source = of('Hello');

		source
			.pipe(
				take(1),
				openNgxModal({ component: TestModalComponent, role: 'alertdialog', label: 'Test' }, service),
				finalize(() => {
					done();
				})
			)
			.subscribe(() => {
				expect(service.open).toHaveBeenCalledWith({
					component: TestModalComponent,
					role: 'alertdialog',
					label: 'Test',
				});
			});
	});
});
