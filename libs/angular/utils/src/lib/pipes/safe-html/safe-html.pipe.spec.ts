import { Sanitizer, SecurityContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
	const sanitizer: any = {
		sanitize: jest.fn().mockReturnValue('Test'),
	};
	TestBed.configureTestingModule({
		providers: [
			SafeHtmlPipe,
			{
				provide: Sanitizer,
				useValue: sanitizer,
			},
		],
	});
	const pipe = TestBed.inject(SafeHtmlPipe);

	it('should sanitize a string', () => {
		const test = 'Test';

		expect(pipe.transform(test)).toEqual('Test');
		expect(sanitizer.sanitize).toHaveBeenCalledWith(SecurityContext.HTML, 'Test');
	});

	it('should map anything that is not a string to an empty string', () => {
		expect(pipe.transform(undefined)).toEqual('');
		expect(pipe.transform(null)).toEqual('');
		expect(pipe.transform(['test'] as any)).toEqual('');
		expect(pipe.transform(0 as any)).toEqual('');
		expect(pipe.transform({ test: 'test' } as any)).toEqual('');
	});
});
