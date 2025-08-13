import { NgxCypressTagsPaths } from '@lib/ngx-utils';

import { CypressTags } from './packages/utils/cypress-tags';

declare module '@libs/ngx-utils' {
  type NgxCypressTagPath = NgxCypressTagsPaths<typeof CypressTags>
}
