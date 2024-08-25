import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { CarouselConfig } from "ngx-bootstrap/carousel";
import { BreakpointService } from "src/app/services/breakpoint/breakpoint.service";

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	providers: [
		{ provide: CarouselConfig, useValue: { interval: 0, noPause: false, pauseOnFocus: true, showIndicators: true } }
	]
})
export class ProjectsComponent implements OnInit {

	isMobile: boolean = false;
	faGithub = faGithub;

	constructor(public translate: TranslateService,
				public router: Router,
				private breakpointService: BreakpointService) { }

	ngOnInit(): void {
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

	isArray(obj: any): boolean {
		return Array.isArray(obj);
	}

}
