import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { UiModule } from '../ui/ui.module';

import { CVComponent } from './cv/cv.component';
import { CVDataService } from './cvdata.service';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        CVComponent,
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
        })
    ],
    exports: [
        CVComponent
    ],
    providers: [
        CVDataService
    ]
})
export class CVModule { }
