/// components
export * from './configurable-layout/configurable-layout.component';
export * from './configurable-layout-item/configurable-layout-item.component';
export * from './accordion';
export * from './image-marker/image-marker.component';
import { Cells } from './cell';
import { NgxTableComponent } from './table/ngx-table.component';

export * from './table/ngx-table.component';
export * from './cell';

/** All the necessary ngx-table components */
export const NgxTable = [NgxTableComponent, ...Cells] as const;
