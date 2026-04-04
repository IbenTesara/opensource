import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NgxAnimalFilter, NgxContentPage, NgxZooAnimal, NgxZooSection } from '../../types';

@Injectable()
export abstract class NgxZooProviderAbstractService {
	public abstract getAnimals(filters?: NgxAnimalFilter): Observable<NgxZooAnimal[]>;
	public abstract getSections(): Observable<NgxZooSection[]>;
	public abstract getContent(): Observable<NgxContentPage[]>;
}
