export type NgxAnimalSpecies =
	| 'mammal'
	| 'bird'
	| 'reptile'
	| 'amphibian'
	| 'fish'
	| 'arthropod'
	| 'mollusk'
	| 'other';

export type NgxConservationStatus =
	| 'endangered'
	| 'criticallyEndangered'
	| 'vulnerable'
	| 'nearThreatened'
	| 'leastConcern'
	| 'dataDeficient'
	| 'notEvaluated';

export type NgxDiet =
	| 'carnivore'
	| 'herbivore'
	| 'insectivore'
	| 'nectarivore'
	| 'frugivore'
	| 'omnivore';

export type NgxContinent =
	| 'africa'
	| 'antarctica'
	| 'asia'
	| 'europe'
	| 'northAmerica'
	| 'southAmerica';

export interface NgxAnimal {
	name: string;
	latinName: string;
	species: NgxAnimalSpecies;
	diet: NgxDiet;
	continent: NgxContinent;
	conservationStatus: NgxConservationStatus;
}

export interface NgxAnimalFilter {
	species?: NgxAnimalSpecies;
	diet?: NgxDiet;
	continent?: NgxContinent;
	conservationStatus?: NgxConservationStatus;
	name?: string;
	section?: string;
}
