import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { UiModule } from '../ui/ui.module';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectsDataService } from './projects-data.service';

import { AssetTypePipe } from './asset-pipe/asset-type.pipe';

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
    providers: [
        ProjectsDataService
    ]
})
export class ProjectsModule { }
