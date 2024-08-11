import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedin, faXing } from '@fortawesome/free-brands-svg-icons';
import { faCode, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { BreakpointService } from 'src/app/services/breakpoint/breakpoint.service';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

	isMobile: boolean = false;
	faGithub = faGithub;
	faLinkedin = faLinkedin;
	faXing = faXing;
	faCode = faCode;
	faFileLines = faFileLines;

	constructor(public breakpointService: BreakpointService) {}

	ngOnInit(): void {
		this.breakpointService.isMobile$.subscribe(isMobile => {
			this.isMobile = isMobile;
		});
	}

	imageClicked(): void {
		let imageElement: HTMLElement = document.getElementById('profile-picture') as HTMLElement;
		imageElement.className = imageElement.className.replace(' animated flipInY', '');
		imageElement.className += ' animated hinge';
		setTimeout(this.appendImage, 3000);
	}

	appendImage(): void {
		let imageElement: HTMLElement = document.getElementById('profile-picture') as HTMLElement;
		imageElement.className = imageElement.className.replace(' hinge', ' flipInY');
	}

}
