import { NgxErrorBoundaryPriority } from './error-boundary-configuration.type';

export interface NgxError {
  element: string;
  priority: NgxErrorBoundaryPriority;
  error: Error;
  time: string;
}
