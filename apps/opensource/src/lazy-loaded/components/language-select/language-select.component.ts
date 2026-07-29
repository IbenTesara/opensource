import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgxI18nService } from '@lib/ngx-i18n';

@Component({
	selector: 'app-language-select',
	template: `
		<div class="language-select-container">
			<label for="language-select">Language / Taal:</label>
			<select
				id="language-select"
				[value]="i18nService.currentLanguage"
				(change)="onLanguageChange($event)"
			>
				<option value="en">English</option>
				<option value="nl">Nederlands</option>
			</select>
		</div>
	`,
	styles: [
		`
			.language-select-container {
				margin-bottom: 15px;
				display: flex;
				align-items: center;
				gap: 8px;
			}
			select {
				padding: 4px 8px;
				border-radius: 4px;
				border: 1px solid #ccc;
				font-size: 14px;
				cursor: pointer;
			}
		`,
	],
})
export class LanguageSelectComponent {
	protected readonly i18nService: NgxI18nService = inject(NgxI18nService);
	private readonly router: Router = inject(Router);

	public onLanguageChange(event: Event): void {
		const select = event.target as HTMLSelectElement;
		const newLang = select.value;
		if (newLang && newLang !== this.i18nService.currentLanguage) {
			this.i18nService.setLanguage(newLang).subscribe(() => {
				const currentUrl = this.router.url;
				const segments = currentUrl.split('/').filter(Boolean);
				if (segments.length > 0) {
					segments[0] = newLang;
					this.router.navigate(segments);
				} else {
					this.router.navigate(['/', newLang]);
				}
			});
		}
	}
}
