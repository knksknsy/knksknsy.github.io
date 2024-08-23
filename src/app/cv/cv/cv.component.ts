import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { faGithub, faLinkedin, faXing } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt, faMobileAlt, faGlobe, faSave, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { map, Observable } from 'rxjs';
import { Project } from '../../interfaces/project';
import { GlobalsService } from '../../services/globals/globals.service';
import { BreakpointService } from '../../services/breakpoint/breakpoint.service';

@Component({
	selector: 'app-cv',
	templateUrl: './cv.component.html',
	styleUrls: ['./cv.component.scss']
})
export class CVComponent implements OnInit {

	faGithub = faGithub;
	faLinkedin = faLinkedin;
	faXing = faXing;
	faEnvelope = faEnvelope;
	faMapMarkerAlt = faMapMarkerAlt;
	faMobileAlt = faMobileAlt;
	faGlobe = faGlobe;
	faSave = faSave;
	faLock = faLock;
	faUnlock = faUnlock;

	public isGerman: boolean = false;
	public path: string = './assets/cv/';
	public fileGerman: string = 'Lebenslauf_Kaan_Keskinsoy.pdf';
	public fileEnglish: string = 'CV_Kaan_Keskinsoy.pdf';

	public fileName: string = '';
	public isPublic: boolean = false;
	public printing: boolean = false;
	public today: Date = new Date();
	public isMobile: boolean = false;

	constructor(public translate: TranslateService,
				public globals: GlobalsService,
				public router: Router,
				private breakpointService: BreakpointService) { }

	ngOnInit(): void {
		this.today = new Date();
		this.isPublic = this.globals.production;

		this.setLanguage(this.translate.currentLang);
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			this.setLanguage(event.lang);
		});

		this.router.events.subscribe((event) => {
			if (!(event instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0);
		});

		this.breakpointService.isMobile$.subscribe(isMobile => {
			this.isMobile = isMobile;
		});
	}

	setLanguage(lang: string): void {
		if (lang === 'de') {
			this.isGerman = true;
		} else {
			this.isGerman = false;
		}
		this.fileName = this.isGerman ? this.fileGerman : this.fileEnglish;
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

	getProjects(start: number, end: number): Observable<Project[]> {
		return this.translate.get('cv.projects').pipe(
			map((projects: Project[]) => {
				if (start < 0) start = 0;
				if (end > projects.length) end = projects.length;
				if (start > end) return [];

				return projects.slice(start, end);
			})
		);
	}

	getProficiencyLevel(levels: number[], level: number): Observable<string> {
		const i = levels.findIndex((l: number) => l === level);
		return this.translate.get('cv.skills.proficiency_levels').pipe(
			map((proficiencyLevels: string[]) => {
				return proficiencyLevels[i];
			})
		);
	}

	imageClicked(): void {
		let imageElement: HTMLElement = document.getElementById('profile-picture') as HTMLElement;
		imageElement.className = imageElement.className.replace(' animated flipInY', '');
		imageElement.className += ' animated hinge';
		imageElement.style.cssText = 'animation: hinge 2s ease-in;';
		setTimeout(this.appendImage, 1900);
	}

	appendImage(): void {
		let imageElement: HTMLElement = document.getElementById('profile-picture') as HTMLElement;
		imageElement.className = imageElement.className.replace(' hinge', ' flipInY');
		imageElement.style.cssText = '';
	}

}
