import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgxMobileLayoutComponent } from '@lib/ngx-layout';
import { NgxZooService } from '@lib/zoo';

@Component({
	imports: [RouterModule, NgxMobileLayoutComponent],
	selector: 'ngx-root',
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App implements OnInit {
	protected title = 'zoo-test';
	private readonly zooService: NgxZooService = inject(NgxZooService);

	ngOnInit(): void {
		this.zooService.getAnimals().subscribe();
		this.zooService.getSections().subscribe();
		this.zooService.getContent().subscribe();
	}
}
