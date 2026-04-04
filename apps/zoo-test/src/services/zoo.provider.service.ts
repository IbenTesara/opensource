import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
	NgxAnimalFilter,
	NgxContentPage,
	NgxZooAnimal,
	NgxZooProviderAbstractService,
	NgxZooSection,
} from '@lib/zoo';

@Injectable({
	providedIn: 'root',
})
export class ZooProviderService extends NgxZooProviderAbstractService {
	public override getAnimals(filters?: NgxAnimalFilter): Observable<NgxZooAnimal[]> {
		return of([
			{
				id: 'lion',
				name: 'Lion',
				latinName: 'Panthera leo',
				species: 'mammal',
				diet: 'carnivore',
				continent: 'africa',
				conservationStatus: 'endangered',
				section: 'Africa',
			},
			{
				id: 'tiger',
				name: 'Tiger',
				latinName: 'Panthera tigris',
				species: 'mammal',
				diet: 'carnivore',
				continent: 'asia',
				conservationStatus: 'endangered',
				section: 'Asia',
			},
			{
				id: 'bear',
				name: 'Bear',
				latinName: 'Ursus arctos',
				species: 'mammal',
				diet: 'omnivore',
				continent: 'northAmerica',
				conservationStatus: 'endangered',
				section: 'North America',
			},
			{
				id: 'elephant',
				name: 'Elephant',
				latinName: 'Elephantus maximus',
				species: 'mammal',
				diet: 'herbivore',
				continent: 'africa',
				conservationStatus: 'endangered',
				section: 'Africa',
			},
		]);
	}
	public override getSections(): Observable<NgxZooSection[]> {
		return of([
			{
				id: 'africa',
				route: 'africa',
				name: 'Africa',
				animals: ['lion', 'elephant'],
				content: 'Africa is a continent of lions and elephants.',
			},
			{
				id: 'asia',
				route: 'asia',
				name: 'Asia',
				animals: ['tiger'],
				content: `# Welcome to Asia, the world of wonders
In this section of the zoo you'll find a wide array of animals!`,
				facilities: [
					{
						id: 'waterfall',
						content: `## The Waterfall restaurant
Enjoy a wonderful lunch or dinner at our Waterfall restaurant, with views of the tigers!`,
					},
				],
			},
			{
				id: 'northAmerica',
				route: 'north-america',
				name: 'North America',
				animals: ['bear'],
				content: `# Welcome to North America, the land of bears!`,
				facilities: [
					{
						id: 'bearCave',
						content: `## The Bear Cave
Enjoy a wonderful lunch or dinner at our Bear Cave, with views of the bears!`,
					},
				],
			},
		]);
	}
	public override getContent(): Observable<NgxContentPage[]> {
		return of([
			{
				id: 'information',
				route: 'information',
				content: [
					{
						id: 'tickets',
						content: '# Tickets\nTickets are available for the zoo.',
					},
					{
						id: 'hours',
						content: 'Hours are from 9am to 5pm.',
					},
					{
						id: 'directions',
						content: 'Directions to the zoo.',
					},
				],
			},
		]);
	}
}
