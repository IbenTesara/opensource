import { Injectable } from '@angular/core';

import { NgxError, NgxErrorHandler } from '@lib/ngx-errors';

@Injectable()
export class ErrorHandlerService extends NgxErrorHandler {
  public override handleError ( error: NgxError ): void {
    console.log('HELLO')
		console.log(error);
	}
}
