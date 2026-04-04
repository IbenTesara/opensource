import {
	NgxLinkContext,
	NgxLinkDestination,
	NgxLinkIconPosition,
	NgxLinkPriority,
	NgxLinkType,
	NgxLinkWidth,
} from '@ibenvandeveire/ngx-layout';

export interface NgxContentItem {
	id: string;
	content: string;
	image?: string;
	link?: NgxContentLink;
}

export interface FaqItem {
	id: string;
	question: string;
	answer: string;
}

export interface NgxContentPage {
	id: string;
	route: string;
	content: NgxContentItem[];
}

export interface NgxContentLink {
	link: string[];
	text: string;
	destination?: NgxLinkDestination;
	linkType?: NgxLinkType;
	linkWidth?: NgxLinkWidth;
	priority?: NgxLinkPriority;
	context?: NgxLinkContext;
	icon?: unknown;
	iconPosition?: NgxLinkIconPosition;
}
