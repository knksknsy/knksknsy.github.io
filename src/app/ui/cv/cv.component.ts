import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CVComponent implements OnInit {

  public isGerman: boolean;
  public fileGerman = 'Lebenslauf_Kaan_Keskinsoy';
  public fileEnglish = 'CV_Kaan_Keskinsoy';

  constructor(public translate: TranslateService) { }

  ngOnInit() {
    this.setLanguage(this.translate.currentLang);
    this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => {
        this.setLanguage(event.lang);
      });
  }

  setLanguage(lang: string) {
    if (lang === 'de') {
      this.isGerman = true;
    } else {
      this.isGerman = false;
    }
  }

  sendGAEvent(category: string, action: string, label: string, value?: number) {
    let event;
    if (!value) {
      event = { eventCategory: category, eventAction: action, eventLabel: label };
    } else {
      event = { eventCategory: category, eventAction: action, eventLabel: label, eventValue: value };
    }
    (<any>window).ga('send', 'event', event);
  }

}
