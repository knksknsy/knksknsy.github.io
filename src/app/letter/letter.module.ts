import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TextareaAutoresizeDirective } from './textarea-directive/textarea-autoresize';
import { UiModule } from '../ui/ui.module';
import { LetterComponent } from './letter/letter.component';
import { GlobalsService } from '../services/globals/globals.service';
import { StorageService } from '../services/storage/storage.service';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSave, faUnlock, faLock, faMapMarkerAlt, faMobileAlt, faEnvelope, faGlobe, faPen, faPlus, faMinus, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faXing } from '@fortawesome/free-brands-svg-icons';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		LetterComponent,
		TextareaAutoresizeDirective
	],
	imports: [
		CommonModule,
		BrowserModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		UiModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	exports: [
		LetterComponent
	],
	providers: [
		GlobalsService,
		StorageService
	]
})
export class LetterModule {

	constructor() {
		library.add(
			faSave,
			faUnlock,
			faLock,
			faMapMarkerAlt,
			faMobileAlt,
			faEnvelope,
			faGlobe,
			faGithub,
			faLinkedin,
			faXing,
			faPen,
			faPlus,
			faMinus,
			faAngleRight,
			faAngleLeft
		);
	}
}
