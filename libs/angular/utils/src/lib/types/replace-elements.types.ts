export type NgxReplaceElementsSelector = `${string}{{id}}${string}`;

export interface NgxReplaceElementsConfigurationElement {
	element: string;
	selector: NgxReplaceElementsSelector;
	includeInnerHtml?: boolean;
}

export type NgxReplaceElementsConfiguration = Record<
	string,
	NgxReplaceElementsConfigurationElement
>;

export interface NgxReplaceElementsItem {
	id: string;
	elementId: string;
	data?: Record<Lowercase<string>, string>;
}
