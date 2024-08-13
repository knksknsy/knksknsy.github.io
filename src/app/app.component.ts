import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage/storage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {

	language: string;
	browserLang: string;

	constructor(public translate: TranslateService,
				public storageService: StorageService,
				public router: Router) {
		this.translate.addLangs(['en', 'de']);
		this.translate.setDefaultLang('de');
		this.setLanguage();

		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				if (this.translate.currentLang !== this.language) {
					this.setLanguage();
					(<any>window).ga('set', 'page', event.urlAfterRedirects);
					(<any>window).ga('send', 'pageview');
				}
			}
		});
	}

	private setLanguage(): void {
		this.browserLang = this.translate.getBrowserLang()?.match(/en|de/) ? this.translate.getBrowserLang()! : 'de';
		this.language = this.storageService.getLanguage() ?? this.browserLang;
		this.translate.use(this.language);
		this.storageService.setLanguage(this.language);
	}

}
