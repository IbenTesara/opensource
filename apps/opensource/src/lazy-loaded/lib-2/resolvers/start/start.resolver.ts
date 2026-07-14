import { ResolveFn } from '@angular/router';
import { delay, Observable, of } from 'rxjs';

export const startResolver: ResolveFn<Observable<boolean>> = (): Observable<boolean> => {
	return of(true).pipe(delay(1000));
};
