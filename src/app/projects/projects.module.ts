import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { UiModule } from '../ui/ui.module';
import { BreakpointService } from '../services/breakpoint/breakpoint.service';
import { ProjectsComponent } from './projects/projects.component';
import { PipesModule } from '../services/pipes/pipes.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        ProjectsComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FontAwesomeModule,
        UiModule,
        PipesModule,
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
    providers: [
        provideHttpClient(),
        BreakpointService
    ]
})
export class ProjectsModule {

    constructor() {
        library.add(faGithub);
    }
}
