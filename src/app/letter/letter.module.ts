import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TextareaAutoresizeDirective } from './textarea-directive/textarea-autoresize';
import { UiModule } from '../ui/ui.module';
import { LetterComponent } from './letter/letter.component';
import { GlobalsService } from '../globals/globals.service';

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
    GlobalsService
  ]
})
export class LetterModule { }
