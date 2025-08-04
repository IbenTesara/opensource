import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NgxAccessibleDragAndDropAbstractService } from '@lib/ngx-layout';

@Injectable({ providedIn: 'root' })
export class DragAndDropService extends NgxAccessibleDragAndDropAbstractService {
	override get currentLanguage(): string | Observable<string> {
		return 'en';
	}
}
