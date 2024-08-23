import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalsService } from '../../services/globals/globals.service';
import { BreakpointService } from 'src/app/services/breakpoint/breakpoint.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	animations: [
		trigger('toggleNavbar', [
		  state('closed', style({
			height: '0px',
			overflow: 'hidden',
			opacity: 0
		  })),
		  state('open', style({
			height: '*',
			opacity: 1
		  })),
		  transition('closed <=> open', [
			animate('300ms ease-in-out')
		  ])
		])
	  ]
})
export class HeaderComponent implements OnInit {

	isMobile: boolean = false;
	navbarOpen = false;

	constructor(public translate: TranslateService,
		private router: Router,
		public globals: GlobalsService,
		public storageService: StorageService,
		private breakpointService: BreakpointService) { }

	ngOnInit(): void {
		this.breakpointService.isMobile$.subscribe(isMobile => {
			this.isMobile = isMobile;
			if (!this.isMobile) {
				this.navbarOpen = true;
			}
		});
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.highlightLang(this.translate.currentLang);
			}
		});
	}

	navigateRoute(url: string): void {
		this.router.navigate([url]).then((s) => {
			if (!this.isMobile) {
				this.navbarOpen = true;
			} else if (this.navbarOpen && this.isMobile) {
				this.navbarOpen = false;
			}
		});
	}

	toggleNavbar(): void {
		this.navbarOpen = !this.navbarOpen;
		if (this.navbarOpen) {
			this.sendGAEvent('Navbar', 'toggled', 'opened');
		} else {
			this.sendGAEvent('Navbar', 'toggled', 'closed');
		}
	}

	translateDE(): void {
		let translationDE: HTMLElement = document.getElementById('german') as HTMLElement;
		let translationEN: HTMLElement = document.getElementById('english') as HTMLElement;
		translationEN.style.cssText = 'text-decoration: none;';
		translationDE.style.cssText = 'text-decoration: underline;';
		this.translate.use('de');
		this.sendGAEvent('I18N', 'changed', 'de');
		this.storageService.setLanguage('de');
		this.toggleNavbar();
	}

	translateEN(): void {
		let translationDE: HTMLElement = document.getElementById('german') as HTMLElement;
		let translationEN: HTMLElement = document.getElementById('english') as HTMLElement;
		translationDE.style.cssText = 'text-decoration: none;';
		translationEN.style.cssText = 'text-decoration: underline;';
		this.translate.use('en');
		this.sendGAEvent('I18N', 'changed', 'en');
		this.storageService.setLanguage('en');
		this.toggleNavbar();
	}

	sendGAEvent(category: string, action: string, label: string, value?: number): void {
		let event;
		if (!value) {
			event = { eventCategory: category, eventAction: action, eventLabel: label };
		} else {
			event = { eventCategory: category, eventAction: action, eventLabel: label, eventValue: value };
		}
		(<any>window).ga('send', 'event', event);
	}

	private highlightLang(lang: string): void {
		if (lang === 'de') {
			let translationDE: HTMLElement = document.getElementById('german') as HTMLElement;
			let translationEN: HTMLElement = document.getElementById('english') as HTMLElement;
			translationEN.style.cssText = 'text-decoration: none;';
			translationDE.style.cssText = 'text-decoration: underline;';
			return;
		}
		if (lang === 'en') {
			let translationDE: HTMLElement = document.getElementById('german') as HTMLElement;
			let translationEN: HTMLElement = document.getElementById('english') as HTMLElement;
			translationDE.style.cssText = 'text-decoration: none;';
			translationEN.style.cssText = 'text-decoration: underline;';
			return;
		}
	}

}
