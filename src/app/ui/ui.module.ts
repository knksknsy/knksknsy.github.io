import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CVComponent } from './cv/cv.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  { path: 'cv', component: CVComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '', component: AboutComponent, pathMatch: 'full' },
  { path: '**', component: AboutComponent }
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    CVComponent,
    ProjectsComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [LayoutComponent]
})
export class UiModule { }
