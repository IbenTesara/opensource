export * from './item-size/item-size.pipe';
import { NgxAriaSortPipe } from './aria-sort/aria-sort.pipe';
import { NgxTableGetPipe } from './get-pipe/get.pipe';
import { NgxTableHasObserversPipe } from './has-observers/has-observers.pipe';
import { NgxTableShowHeaderPipe } from './show-header/show-header.pipe';
import { NgxTableSortIconPipe } from './sort-icon/sort-icon.pipe';

export * from './has-observers/has-observers.pipe';
export * from './sort-icon/sort-icon.pipe';
export * from './get-pipe/get.pipe';
export * from './show-header/show-header.pipe';
export * from './aria-sort/aria-sort.pipe';
export * from './matches-query/matches-query.pipe';

export const Pipes = [
	NgxTableHasObserversPipe,
	NgxTableSortIconPipe,
	NgxTableGetPipe,
	NgxTableShowHeaderPipe,
	NgxAriaSortPipe,
];
