import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
export class UiModule { }
