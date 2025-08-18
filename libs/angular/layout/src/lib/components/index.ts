/// components
export * from './configurable-layout/configurable-layout.component';
export * from './configurable-layout-item/configurable-layout-item.component';
export * from './accordion';
export * from './image-marker/image-marker.component';
export * from './mobile-layout/mobile-layout.component';
export * from './feed/feed.component';
import { Cells } from './cell';
import { NgxConfigurableLayoutComponent } from './configurable-layout/configurable-layout.component';
import { NgxConfigurableLayoutItemComponent } from './configurable-layout-item/configurable-layout-item.component';
import { NgxTableComponent } from './table/ngx-table.component';

export * from './table/ngx-table.component';
export * from './cell';

/** All the necessary ngx-table components */
export const NgxTable = [NgxTableComponent, ...Cells] as const;

/** All the necessary ngx-configurable layout components */
export const NgxConfigurableLayout = [
	NgxConfigurableLayoutComponent,
	NgxConfigurableLayoutItemComponent,
] as const;
