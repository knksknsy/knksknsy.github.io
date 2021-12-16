import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { UiModule } from '../ui/ui.module';

import { ProjectsComponent } from './projects/projects.component';

import { AssetTypePipe } from './asset-pipe/asset-type.pipe';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        ProjectsComponent,
        AssetTypePipe
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        FontAwesomeModule,
        UiModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        CarouselModule.forRoot()
    ],
    exports: [
        ProjectsComponent
    ],
    providers: []
})
export class ProjectsModule {

    constructor() {
        library.add(faGithub);
    }
}
