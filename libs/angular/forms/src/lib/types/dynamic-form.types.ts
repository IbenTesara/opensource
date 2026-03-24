import { Type } from '@angular/core';

import { NgxDynamicFormInputComponent } from '../abstracts';

export type NgxDynamicFormConfiguration = Record<string, Type<NgxDynamicFormInputComponent>>;
