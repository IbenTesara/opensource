---
name: ngx-layout-markdown-button-link
description: >-
  ngxMarkdown pipe, ngxButton and ngxLink directives with root configuration
  from @ibenvandeveire/ngx-layout.
---

# ngx-layout — Markdown, button, link

## Markdown

```typescript
provideNgxMarkdownConfiguration([]); // Marked extensions
```

```html
<div class="ngx-markdown-element" [innerHTML]="content | ngxMarkdown"></div>
```

Or use `NgxMarkdownService` programmatically.

## Button — ngxButton

```typescript
provideNgxButtonConfiguration({
  loading: ButtonLoadingComponent,
  icon: ButtonIconComponent,
  iconPosition: 'left',
  labelWrapper: 'span',
}),
```

```html
<button ngxButton priority="primary" buttonType="regular" [loading]="isLoading()">Submit</button>
<button ngxButton buttonType="fab" display="icon" icon="fa fa-home"></button>
```

| Input | Values |
| ----- | ------ |
| priority | primary, secondary, tertiary, danger, success |
| buttonType | regular, outline, text, fab |
| display | icon, text, both |
| buttonWidth | full, fit |

Classes: `ngx-button`, `ngx-button-{priority}`, `ngx-button-loading`, etc.

## Link — ngxLink

```typescript
provideNgxLinkConfiguration({ icon: LinkIconComponent, iconPosition: 'left' }),
```

```html
<a ngxLink [routerLink]="['page1']">Internal</a>
<a ngxLink destination="external" href="https://…" icon="fa fa-external">External</a>
```

| Input | Values |
| ----- | ------ |
| linkType | text, icon, button |
| context | navigation, breadcrumb, anchor, form, footer |
| destination | internal, external (sets target) |

Classes: `ngx-link`, `ngx-link-{priority}`, `ngx-link-{linkType}`.
