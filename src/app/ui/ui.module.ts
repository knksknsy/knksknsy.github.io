import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';

import { CVComponent } from '../cv/cv/cv.component';
import { ProjectsComponent } from '../projects/projects/projects.component';
import { LetterComponent } from '../letter/letter/letter.component';

import { GlobalsService } from '../globals/globals.service';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSave, faUnlock, faLock, faMapMarker, faMobile, faMapMarkerAlt, faMobileAlt, faEnvelope, faGlobe, faPen, faPlus, faMinus, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faXing } from '@fortawesome/free-brands-svg-icons';

export const appRoutes: Routes = [
    { path: 'cv', component: CVComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'letter', component: LetterComponent },
    { path: '', component: AboutComponent, pathMatch: 'full' },
    { path: '**', component: AboutComponent }
];

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule,
        FontAwesomeModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        LayoutComponent
    ],
    providers: [
        GlobalsService
    ]
})
export class UiModule {

    constructor() {
        library.add(
            faSave,
            faUnlock,
            faLock,
            faMapMarker,
            faMobile,
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
