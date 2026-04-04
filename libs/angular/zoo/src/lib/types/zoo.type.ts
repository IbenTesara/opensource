import { NgxAnimal } from './animal.type';
import { NgxContentItem, FaqItem } from './general.type';

export interface NgxZoo {
	name: string;
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
		country: string;
	};
	socialMedia?: Partial<{
		facebook: string;
		instagram: string;
		twitter?: string;
		youtube?: string;
		tiktok?: string;
	}>;
}

export interface NgxZooAnimal<DataType = unknown>
	extends NgxAnimal,
		Omit<NgxContentItem, 'content'> {
	section: string;
	content?: NgxContentItem[];
	data?: DataType;
}

export interface NgxZooSection<DataType = unknown> extends Omit<NgxContentItem, 'link'> {
	name: string;
	route: string;
	animals: string[];
	highlights?: NgxContentItem[];
	activities?: NgxContentItem[];
	facilities?: NgxContentItem[];
	accommodations?: NgxContentItem[];
	projects?: NgxContentItem[];
	news?: NgxContentItem[];
	faq?: FaqItem[];
	data?: DataType;
}
