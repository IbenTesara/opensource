import { Injectable } from '@angular/core';

import { NgxError } from '../types';

@Injectable()
export abstract class NgxErrorHandler {
  /**
   * Handle a provided error
   */
  public abstract handleError( error: NgxError ): void;
}
